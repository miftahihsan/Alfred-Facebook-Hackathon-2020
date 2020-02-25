
/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
var AWS = require("aws-sdk");
var async = require('async');

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

const employee = "Employee";
const outsider = "outsider";

var params = {
  TableName : "Employee",
  KeySchema: [
    { AttributeName: "emp_id", KeyType: "HASH"},  //Partition key
    // { AttributeName: "title", KeyType: "RANGE" }  //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "emp_id", AttributeType: "S" },
    // { AttributeName: "topic", AttributeType: "S" },
    // { AttributeName: "todo", AttributeType: "S" },
    // { AttributeName: "schedule", AttributeType: "S" },
    // { AttributeName: "hours_worked", AttributeType: "N" },
    // { AttributeName: "sentiment_score", AttributeType: "N" }
    // { AttributeName: "title", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});


function get(emp_id, table_name, id){

}

function insert(emp_id, table_name){

  
  var params = {
    TableName: table_name,
    Item: {
     "emp_id": emp_id
    }
   };
   dynamodb.putItem(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else console.log(data);           // successful response
     /*
     data = {
      ConsumedCapacity: {
       CapacityUnits: 1, 
       TableName: "Music"
      }
     }
     */
   });


}


async function getHelper(params){
  return  await docClient.get(params, function(err, data) {
                    if (err) {
                        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                    }
                });
}

function ifExists(emp_id, table_name){
  var params = {
    TableName: table_name,
    Key:{
        "emp_id": emp_id,
    }

  };

  var result = getHelper(params);

  var exists = false;

  if (result.Item !== undefined && result.Item !== null) {
    exists = true
  }

  return exists;
}

module.exports = {
  ifExists,
  insert,
  get
}