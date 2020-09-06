
# The New You - personal trainer
##  Description
The Training and Nutrition Application is a web app which allows users to participate in Challenges  to achieve optimal weight and a strong body. The application provides users with a mandatory training and nutrition plan on a daily basis and necessary tips. 
 
## Prerequisites
To run this application you need:
 - Version of JDK 8 
 - PostgreSQL with settings:
 hostname: localhost
port: 5432
username: postgres
password: root
 - Angular
 - npm
 - Node.js
 
## Getting started
 - Checkout the git repository and import the project into IntelliJ as Gradle project
 - The default  Spring profile is ***prod***. To activate profiles ***dev*** or ***test*** via command-line use:
   ***the Java system property*** 
   `java -Dspring.profiles.active=dev -jar profiles-0.0.1-SNAPSHOT.jar`.

	Make sure that its running successfully. 
Now the backend is ready to serve the contents to the frontend.
Our dev and test environments are running on localhost:8081.
 - Navigate to the "angular" directory and install the necessary packages for the angular application using: npm install
 - Now start the frontend application using: npm start
 - Navigate to the page [http://localhost:4200](http://localhost:4200/)
 - Login as an admin:
 username (kasutajanimi): Stan
 password (salasõna): test
 

## Users
 - **Admin** (personal trainer)
 The super user with access to all functionality
 - **Customer** (trainee)
Access to the training and nutrition plans, tips and community.

## Running the tests
Integration tests are used  to check if different modules are working fine when combined together as a group.
Individual units of source code are tested by unit tests used JUnit and Mockito.
During tests an in-memory database is used.

## Bugs

## Technologies Used


### Back-End
 - **Spring Boot** -  Java-based open-source back-end framework  
 - **Spring Security** - authentication and access-control framework
 - **Spring WebSocket** - connection between a web browser and a server
 - **Gradle** - Dependency Management
 - **JUnit** and **Mockito** -testing frameworks
### Front-End
 - **Angular** - JavaScript-based open-source front-end web framework
 - **Angular Material**- Design components
 - **STOMP with SockJS** - messaging protocol
 - **HammerJS** - touch gestures
 
 ### Database
  - **PostgreSQL**  - database management system (with H2 for unit testing)


## Authors

 - **Stanislav** - *Team Lead, Full-Stack*
 - **Lauri** -  *Full-Stack*
 - **Õnne** - *Full-Stack*
 

## Acknowledgments
**Hatef Palizgar** - the best Java trainer
