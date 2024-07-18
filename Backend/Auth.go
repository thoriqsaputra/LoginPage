package main

import (
	"database/sql"
	"net/http"
	"time"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
    "log"
)
type User struct {
    Password  string `json:"password"`
    Email     string `json:"email"`
}

type SignupPayload struct {
    Password  string `json:"password"`
    Email     string `json:"email"`
	Name 	string `json:"name"`
}

func main() {
    log.Println("Starting server...")
    db, err := sql.Open("postgres", "user=postgres password=1234 dbname=GRD sslmode=disable")
    log.Println("Connected to database")
    if err != nil {
            panic(err)
        }
    defer db.Close()
    
        // Query the list of tables
    rows, err := db.Query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
    `)
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()

    log.Println("Tables in the database:")
    for rows.Next() {
        var tableName string
        if err := rows.Scan(&tableName); err != nil {
            log.Fatal(err)
        }
        log.Println(tableName)
    }


    r := gin.Default()

    // CORS middleware
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

    r.POST("/signup", func(c *gin.Context) {
        var payload SignupPayload
        if err := c.ShouldBindJSON(&payload); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        log.Println("Received signup request")
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), bcrypt.DefaultCost)
        if err != nil {
            log.Println("Failed to hash password")
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
            return
        }
        

        
        if _, err := db.Exec("INSERT INTO hudson (email, password, name) VALUES ($1, $2, $3)", payload.Email, string(hashedPassword), payload.Name); err != nil {
            log.Println("Failed to insert user into database")
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
            return
        }

        c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
    })

    r.POST("/login", func(c *gin.Context) {
        var user User
        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        log.Println("Received login request")
        hashedPassword := getUserPassword(db, user.Email)
        if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(user.Password)); err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
            return
        }

        c.JSON(http.StatusOK, gin.H{"message": "You are logged in"})
    })
    r.Run()
}

func getUserPassword(db *sql.DB, email string) string {
    var hashedPassword string
    if err := db.QueryRow("SELECT password FROM hudson WHERE email = $1", email).Scan(&hashedPassword); err != nil {
        return ""
    }
    return hashedPassword
}