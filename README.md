# VaultDragon API

Server: Amazon EC2 (free tier)<br />
URL: "ec2-34-208-10-36.us-west-2.compute.amazonaws.com"<br />
Stack: Node.js, MongoDB, Express.js, Mongoose.js, Express-validator.<br />
Process Manager: PM2<br />


---

## API call<br />

### Core functions

#### Create object<br />
Method: POST<br />
Endpoint: http://ec2-34-208-10-36.us-west-2.compute.amazonaws.com/api/object<br />
Body: JSON: {mykey : value1}<br />
Time: 07:59:22 pm

#### Get object<br />
Method: GET<br />
Endpoint: http://ec2-34-208-10-36.us-west-2.compute.amazonaws.com/api/object/myKey<br />
Response: value1<br />

#### Get object with time<br />
Method: GET<br />
Endpoint: http://ec2-34-208-10-36.us-west-2.compute.amazonaws.com/api/object/myKey2?timestamp=1490774362<br />
Response: value1<br />

### Additional functions

#### Show all objects<br />
Method: GET<br />
Endpoint: http://ec2-34-208-10-36.us-west-2.compute.amazonaws.com/api/object<br />

#### Rmove all objects<br />
Method: DELETE<br />
Endpoint: http://ec2-34-208-10-36.us-west-2.compute.amazonaws.com/api/object/delete<br />

---
Additional info:<br />
I have no prior experience in all the above, this API is completed through the help of multiple online tutorials and Stack Overflow.
