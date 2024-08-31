# API Documentation

## 1. Registration (POST /auth/register)

- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "yourUsername",
    "email": "yourEmail@example.com",
    "password": "yourPassword"
  }
  ```
- **Response**: ข้อมูลผู้ใช้ที่ถูกสร้างใหม่ หรือข้อความแสดงข้อผิดพลาดหาก `email` หรือ `username` มีอยู่แล้วในระบบ

## 2. Sign In (POST /auth/signin)

- **Endpoint**: `/auth/signin`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "yourUsername",
    "password": "yourPassword"
  }
  ```
- **Response**: JWT token ที่ใช้ในการเข้าถึง API อื่น ๆ

## 3. Get Current User (GET /auth/me)

- **Endpoint**: `/auth/me`
- **Method**: `GET`
- **Headers**: ต้องส่ง `Authorization` header ที่มี `Bearer <JWT Token>` ซึ่งได้รับจากการ Sign In
- **Response**: ข้อมูลผู้ใช้ปัจจุบันที่ได้ทำการล็อกอิน

## 4. Create a Quote (POST /quote)

- **Endpoint**: `/quote`
- **Method**: `POST`
- **Headers**: ต้องส่ง `Authorization` header ที่มี `Bearer <JWT Token>`
- **Request Body**:
  ```json
  {
    "content": "This is a new quote"
  }
  ```
- **Response**: ข้อมูล quote ที่ถูกสร้างใหม่

## 5. Search Quotes (GET /quote/search)

- **Endpoint**: `/quote/search`
- **Method**: `GET`
- **Headers**: ต้องส่ง `Authorization` header ที่มี `Bearer <JWT Token>`
- **Query Parameters**:
  - `search`: ข้อความที่ต้องการค้นหาใน quote
- **Response**: รายการ quotes ที่ตรงกับข้อความค้นหา

## 6. Get All Quotes (GET /quote)

- **Endpoint**: `/quote`
- **Method**: `GET`
- **Headers**: ต้องส่ง `Authorization` header ที่มี `Bearer <JWT Token>`
- **Response**: รายการ quotes ทั้งหมดที่มีในระบบ

## 7. Get a Single Quote (GET /quote/:id)

- **Endpoint**: `/quote/:id`
- **Method**: `GET`
- **Headers**: ต้องส่ง `Authorization` header ที่มี `Bearer <JWT Token>`
- **URL Parameters**: `id` คือ ID ของ quote ที่ต้องการดู
- **Response**: ข้อมูลของ quote ที่ตรงกับ ID

## 8. Update a Quote (PUT /quote/:id)

- **Endpoint**: `/quote/:id`
- **Method**: `PUT`
- **Headers**: ต้องส่ง `Authorization` header ที่มี `Bearer <JWT Token>`
- **URL Parameters**: `id` คือ ID ของ quote ที่ต้องการอัปเดต
- **Request Body**:
  ```json
  {
    "content": "Updated quote content"
  }
  ```
- **Response**: ข้อมูล quote ที่ถูกอัปเดต

## 9. Delete a Quote (DELETE /quote/:id)

- **Endpoint**: `/quote/:id`
- **Method**: `DELETE`
- **Headers**: ต้องส่ง `Authorization` header ที่มี `Bearer <JWT Token>`
- **URL Parameters**: `id` คือ ID ของ quote ที่ต้องการลบ
- **Response**: ข้อมูลของ quote ที่ถูกลบ

## 10. Toggle Vote (POST /vote/toggle)

- **Endpoint**: `/vote/toggle`
- **Method**: `POST`
- **Headers**:

  - ต้องส่ง `Authorization` header ที่มี `Bearer <JWT Token>`

- **Request Body**:
  ```json
  {
    "quoteId": 1
  }
  ```
  - **Response** : ลบการโหวต หรือ โหวตให้กับ Quote
