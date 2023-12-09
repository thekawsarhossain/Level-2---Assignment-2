# Level 2 - Assignment 2

## Getting Started

### Installation

Clone the project:

```bash
  git clone https://github.com/thekawsarhossain/l-2-a-2.git
```

Go to the project directory:

```bash
  cd Level-2---Assignment-2
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run start:dev
```

### Environment Variables

Make sure to set the following environment variables:

- `PORT`: Port on which the server will run
- `DATABASE_URL`: MongoDB connection string
- `BCRYPT_SALT_ROUNDS`: Number of bcrypt salt rounds

## API Endpoints

### Create User

#### Endpoint: `POST /api/users`

**Request:**

```json
{
  "user": {
    "userId": 1,
    "username": "thekawsarhossain",
    "password": "hello world",
    "fullName": {
      "firstName": "Kawsar",
      "lastName": "Hossain"
    },
    "age": 20,
    "email": "thekawsarhossain@gmail.com",
    "isActive": true,
    "hobbies": ["programming", "photography"],
    "address": {
      "street": "Aruail",
      "city": "Brahmanbaria",
      "country": "Bangladesh"
    }
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "userId": 1,
    "username": "thekawsarhossain",
    "fullName": {
      "firstName": "Kawsar",
      "lastName": "Hossain",
      "_id": "6574293cf1cafaa44970cacd"
    },
    "age": 20,
    "email": "thekawsarhossain@gmail.com",
    "isActive": true,
    "hobbies": ["programming", "photography"],
    "address": {
      "street": "Aruail",
      "city": "Brahmanbaria",
      "country": "Bangladesh",
      "_id": "6574293cf1cafaa44970cace"
    }
  }
}
```
