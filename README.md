# Gestion des Achats - Purchase Management System

A full-stack application for managing purchase orders and suppliers built with Angular and Spring Boot.

## Project Structure

```
/
├── frontend/                      # Angular frontend application
│   └── gestion-achat-frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/   # Angular components
│       │   │   ├── models/       # Data models/interfaces
│       │   │   └── services/     # API services
│       │   └── styles.scss       # Global styles
│       └── package.json          # Frontend dependencies
│
├── Gestion-Achat/               # Spring Boot backend application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/aziz/
│   │   │   │       ├── controllers/  # REST controllers
│   │   │   │       ├── entities/     # JPA entities
│   │   │   │       ├── repositories/ # Spring Data repositories
│   │   │   │       └── services/     # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml                  # Backend dependencies
│
└── docker-compose.yml           # Docker compose configuration
```

## Features

- Purchase Order Management
  - Create, view, edit and delete purchase orders
  - Track order status (In Progress, Validated, Delivered, Cancelled)
  - Line items management with products, quantities and prices
  - Order history tracking

- Supplier Management 
  - Supplier directory with contact information
  - Supplier evaluation and rating
  - Order history by supplier

- History & Tracking
  - Audit trail of all purchase operations
  - Operation types: Creation, Validation, Delivery, Cancellation
  - Detailed view with timestamps and user info

## Technology Stack

### Frontend
- Angular 17
- Angular Material UI
- RxJS
- TypeScript
- SCSS

### Backend  
- Spring Boot 3
- Spring Data JPA
- MySQL Database
- Maven
- Java 17

## Setup & Installation

1. Database Setup
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE gestion_achat;
```

2. Backend Setup
```bash
cd Gestion-Achat
./mvnw spring-boot:run
```

3. Frontend Setup 
```bash 
cd frontend/gestion-achat-frontend
npm install
ng serve
```

4. Access the application at http://localhost:4200

## Environment Configuration

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_achat
spring.datasource.username=root
spring.datasource.password=root
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## API Endpoints

- Purchase Orders
  - GET /api/commandes-achat - List all orders
  - POST /api/commandes-achat - Create order
  - GET /api/commandes-achat/{id} - Get order details
  - PUT /api/commandes-achat/{id} - Update order status
  - DELETE /api/commandes-achat/{id} - Delete order

- Suppliers
  - GET /api/fournisseurs - List all suppliers
  - POST /api/fournisseurs - Create supplier
  - GET /api/fournisseurs/{id} - Get supplier details
  - PUT /api/fournisseurs/{id} - Update supplier
  - DELETE /api/fournisseurs/{id} - Delete supplier

- History
  - GET /api/historique - Get operation history
  - GET /api/historique/{id} - Get operation details
  - GET /api/historique/commande/{id} - Get history by order

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
