# Level 2 - Assignment 2

## Getting Started

### Installation

Clone the project:

```bash
  git clone https://github.com/thekawsarhossain/Level-2---Assignment-2.git
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

### Get User

#### Endpoint: `GET /api/users/:userId`

**Response:**

```json
{
  "success": true,
  "message": "Users fetched successfully!",
  "data": {
    "username": "thekawsarhossain",
    "fullName": {
      "firstName": "Kawsar",
      "lastName": "Hossain"
    },
    "age": 20,
    "email": "kawsar@objex.tech",
    "address": {
      "street": "Aruail",
      "city": "Brahmanbaria",
      "country": "Bangladesh"
    }
  }
}
```

### Get Users

#### Endpoint: `GET /api/users`

**Response:**

```json
{
  "success": true,
  "message": "Users fetched successfully!",
  "data": [
    {
      "username": "thekawsarhossain",
      "fullName": {
        "firstName": "Kawsar",
        "lastName": "Hossain"
      },
      "age": 20,
      "email": "kawsar@objex.tech",
      "address": {
        "street": "Aruail",
        "city": "Brahmanbaria",
        "country": "Bangladesh"
      }
    }
  ]
}
```

### Delete User by ID

#### Endpoint: `DELETE /api/users/:userId`

**Response**

```json
{
  "success": true,
  "message": "User deleted successfully!",
  "data": null
}
```

### Update User by ID

#### Endpoint: `PUT /api/users/:userId`

**Request**
_Partial user data for updating_

```json
{
  "user": {
    "fullName": {
      "firstName": "Kawsar",
      "lastName": "Updated"
    }
  }
}
```

**Response**

```json
{
  "success": true,
  "message": "User updated successfully!",
  "data": {
    "userId": 1,
    "username": "thekawsarhossain",
    "fullName": {
      "firstName": "Kawsar 1",
      "lastName": "Hossain",
      "_id": "65747f6c26153991d8d7de3f"
    },
    "age": 20,
    "email": "thekawsarhossain@gmail.com",
    "isActive": true,
    "hobbies": ["programming", "photography"],
    "address": {
      "street": "Aruail",
      "city": "Brahmanbaria",
      "country": "Bangladesh",
      "_id": "65747f6c26153991d8d7de40"
    }
  }
}
```

### Create Order for User

#### Endpoint: `PUT /api/users/:userId/orders`

**Request**

```json
{
  "order": {
    "productName": "Laptop",
    "price": 20000,
    "quantity": 2
  }
}
```

**Response**

```json
{
  "success": true,
  "message": "Order created successfully!",
  "data": null
}
```

### Get User Orders

#### Endpoint: `GET /api/users/:userId/orders`

**Response**

```json
{
  "success": true,
  "message": "Order fetched successfully!",
  "data": {
    "orders": [
      {
        "productName": "Laptop",
        "price": 20000,
        "quantity": 2,
        "_id": "6574806826153991d8d7de45"
      }
    ]
  }
}
```

### Calculate User Total Order Price

#### Endpoint: `GET /api/users/:userId/orders/total-price`

**Response**

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": {
    "totalPrice": 40000
  }
}
```
