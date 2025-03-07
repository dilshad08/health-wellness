# 🏥 Health & Wellbeing System Backend

This is a Node.js + Express backend for a Health & Wellbeing System that allows users to manage their medications, receive scheduled reminders, and generate weekly reports. The system includes:

👉 User Authentication (JWT-based)👉 Medication Management (One-time & Recurring)👉 BullMQ Queues (Email Notifications, Report Generation)👉 MongoDB for Data Storage👉 Docker for Containerization👉 Security Enhancements (Helmet, CORS, Input Validation, Secure Headers, and Data Encryption)

---

## 🚀 **Tech Stack**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Queue System**: BullMQ (Redis)
- **Task Scheduling**: BullMQ
- **Authentication**: JWT (JSON Web Token)
- **Security**: Helmet, CORS, Input Validation, Secure Headers
- **Containerization**: Docker & Docker Compose

---

## 👤 **Installation Guide**

### **1. Clone the Repository**

```bash
git clone https://github.com/dilshad08/health-wellness.git
cd health-wellness
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root directory:

```
PORT=''
MONGO_URI=''
JWT_SECRET=''
REDIS_HOST=''
REDIS_PORT=''
```

### **4. Start MongoDB & Redis**

If running locally, ensure **MongoDB** and **Redis** are running:

```bash
mongod --dbpath=/data/db
redis-server
```

### **5. Run the Backend**

#### **Development Mode**

```bash
npm run dev
```

_(Runs the server with Nodemon for auto-reloading.)_

#### **Production Mode**

```bash
npm run prod
```

_(Runs the server normally.)_

---

## 💪 **Running with Docker**

If you prefer **Docker**, use:

```bash
docker-compose up --build
```

This will start:
✅ **Node.js Backend**  
✅ **MongoDB**  
✅ **Redis**

---

## 🔗 **API Endpoints**

### **Authentication**

| Method | Endpoint                   | Description                 |
| ------ | -------------------------- | --------------------------- |
| POST   | `api/v1/auth/register`     | Register a new user         |
| POST   | `api/v1/auth/login`        | User login                  |
| POST   | `api/v1/auth/logout`       | Logout from current session |
| POST   | `api/v1/auth/logout-all`   | Logout from all devices     |
| POST   | `api/v1/auth/logout-other` | Logout from other devices   |

### **Medication Management**

| Method | Endpoint                          | Description        |
| ------ | --------------------------------- | ------------------ |
| POST   | `api/v1/medications/`             | Add new medication |
| GET    | `api/v1/medications/update?id=""` | Add new medication |

---

## ⌛ **Automated Jobs**

| Job Type         | Description                                            |
| ---------------- | ------------------------------------------------------ |
| **Cron Job**     | Sends medication reminders as per user's medication    |
| **BullMQ Queue** | Handles email notifications & weekly report generation |

---

## 🛠 **Built-in Middleware**

| Middleware               | Description                             |
| ------------------------ | --------------------------------------- |
| **`authMiddleware.js`**  | Protects routes with JWT authentication |
| **`errorMiddleware.js`** | Handles global errors in API responses  |

---

## 📄 **License**

This project is **open-source** and available under the **MIT License**.

---

## 💌 **Contact**

For any issues, reach out at:  
📧 **Email:** idilshadk@gmail.com
🌐 **GitHub:** [Dilshad](https://github.com/dilshad08)

---

### 🚀 **Now your project is well-documented with clear setup instructions!**

Let me know if you need modifications! 😊
