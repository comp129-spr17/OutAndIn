# Apollo API v1
## Introduction
Welcome to the Apollo API documentation.

The Apollo API allows Apollo Frontend servers an easy way to interface with resources within the Apollo backend using conventional HTTP requests. The endpoints allow you to easily make calls to retrieve information or to execute actions.

The API documentation will provide you with a general overview about the design and technology that has been implemented, followed by reference information about specific endpoints.

## Requests
Any tool that is fluent in HTTP can communicate with the API simply by requesting the correct URI. Requests should be made using the HTTPS protocol so that traffic is encrypted. This is currently not supported by the API, but will soon be implemented. The API interfaces respond to different methods depending on the action required.


| Method | Usage |
| --- | --- |
| GET | For simple retrieval of information, you should use the GET method. The information you request will be returned to you as a JSON object. <br /> <br /> The attributes defined by the JSON object can be used to form additional requests. Any request using the GET method is read-only and will not affect any of the objects you are querying. |
| POST | To create a new object, your request should specify the POST method. <br /> <br /> The POST request includes all of the attributes necessary to create a new object. When you wish to create a new object, send a POST request to the target endpoint. |
| PUT | To update the information about a resource, use the PUT method. <br /> <br /> Like the DELETE Method, the PUT method is idempotent. It sets the state of the target using the provided values, regardless of their current values. Requests using the PUT method do not need to check the current attributes of the object. |
| DELETE | To remove a resource, the DELETE method should be used. This will remove the specified object if it is found. If it is not found, the operation will return a response indicating that the object was not found. |

Idempotency means that you do not have to check for a resource's availability prior to issuing a delete command, the final state will be the same regardless of its existence.

## HTTP Statuses
The API will respond to HTTP methods and return standard HTTP statuses, including error codes.

If a problem occured, the status will contain the error code and the body of the response will contain additional information about the problem that it encountered.

For the most part, if the status returned is in the 200 range, it indiciates that the request was fulfilled successfull and no problems occurred.


If your requests returns an HTTP response code in the 400 range, this would indicate that thre was an issue with the request you made.  This could also mean that your API client is not authenticated and will not be able to make further requests, that the resource you are requesting does not exist, or that you made a malformed request.

**Example Error Response**
```json
HTTP/1.1 403 Forbidden
{
    "id": "forbidden",
    "message": "You do not have access to complete your attempted action"
}
```

## Responses
When a request is successfully completed, a presonse body will be sent back in the form of a JSON object. An exception to this is when a DELETE request is processed, which will result in a successful HTTP 204 status and an empty response body.

Inside of the JSON object, the resource root that was the target of the request will be set as the key.  This will be the signluar form of the word if the request operated on a single object, and the plural form of the word if a collection was processed.

For example, if you send a GET request to `/api/v1/users` you will get back an object with a key called `"users"`. If you send a GET request to `/api/v1/user/$ID`, then you will get back an object with a key called `"user"`.

**Response For A Single Object**
```json
{
    "user": {
        "uuid": "30e039ed-7768-4472-b483-6803fb5ae041",
        ...
    }
}
```

**Response For An Object Collection**
```json
{
    "users": [
        {
            "uuid": "30e039ed-7768-4472-b483-6803fb5ae041",
            ...
        },
        ...
    ]
}
```

## OAuth Authentication
Once authentication is implemented, I will update the documentation here.

## Cross Origin Resource Sharing

In order to make requests to the API from other domains, the API implements Cross Origin Resource Sharing (CORS) support.

CORS support is generally used to create AJAX requests outside of the domain that the request originated from. This is necessary to implement projects like control panels utilizing the API. This tells the browser that it can send requests to an outside domain.

The procedure that the browser initiates in order to perform these actions (other than GET requests) begins by sending a "preflight" request. This sets the Origin header and uses the OPTIONS method. The server will reply back with the methods it allows and some of the limits it imposes. The client then sends the actual request if it falls within the allowed constraints.

This process is usually done in the background by the browser, but you can use curl to emulate this process using the example provided. The headers that will be set to show the constraints are:

- **Access-Control-Allow-Origin**: This is the domain that is sent by the client or browser as the origin of the request. It is set through an Origin header.
- **Access-Control-Allow-Methods**: This specifies the allowed options for requests from that domain. This will generally be all available methods.
- **Access-Control-Expose-Headers**: This will contain the headers that will be available to requests from the origin domain.
- **Access-Control-Max-Age**: This is the length of time that the access is considered valid. After this expires, a new preflight should be sent.
- **Access-Control-Allow-Credentials**: This will be set to true. It basically allows you to send your OAuth token for authentication.

You should not need to be concerned with the details of these headers, because the browser will typically do all of the work for you.

**Example Preflight Request**
```
curl -I -H "Origin: https://example.com" -X OPTIONS "https://api.digitalocean.com/v2/droplets"
```

**Example Preflight Response**
```
...
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Expose-Headers: RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, Total, Link
Access-Control-Max-Age: 86400
Access-Control-Allow-Credentials: true
...
```

## Endpoints
The API Endpoints
* **[Users](#users)**
* **[Chats](#chats)**

## Users
**User Object Definition**

These fields are the ones available via the API. Some fields such as the password hash are not provided as they would pose a security risk and not neccessary for external use.

| **Name** | **Type** | **Description** |
| ---- | ---- | ---- |
| uuid | string | The Universally Unique Identifier for the user |
| email | string | The email address of the user |
| fullname | string | The full name of the user |
| username | string | The username of the user |
| avatar | string | The URL path of the avatar |

**Resource Methods**

* **[Get All Users](#get-all-users)**
* **[Update All Users](#update-all-users)**

## Get All Users
Returns a collection of all the users

**URL:**
 `/api/v1/users`

**Method:**
  `GET`

**URL Paramaters:**
  `None`

**CURL Example:**
```
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" "https://localhost:4200/api/v1/users"
```

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer $TOKEN
```

**Query Paramaters:** <br />
Below are the query parameters available. They are also case sensitive.

| **Name** | **Values Available** | **Example URL** |
| ---- | ---- | --- |
| Fields | <ul><li>`uuid`: ff06479d-79d0-4baa-999e-ea16a9030e93</li><li>`email`: test@example.com</li><li>`fullname`: Test User</li><li>`username`: test</li><li>`avatar`: http://example.com/path/to/avatar.jpg </li></ul> | `/api/v1/users?fields=username,uuid` |

**Data Params:**
`None`

**Response:**
- **Success Code:** `200`
- **Body:** 
```json
{ 
    "users": [
        { 
            "uuid": "ff06479d-79d0-4baa-999e-ea16a9030e93", 
            "email": "test@example.com", 
            "fullname": "Test User", 
            "username": "test", 
            "avatar": "http://example.com/path/to/avatar.jpg"
        }, 
        ...
    ]
}
``` 
