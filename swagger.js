const normalizePort = require('./outils/normalizePort');
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: "Monbly Api",
        version: '1.0.0',
      },
      servers: [{
        url: `http://127.0.0.1:${normalizePort(process.env.PORT || 2912)}/`
      }],
      tags:[{
        name: "User Account",
        description: "Create user account and Login ",
        externalDocs: {
          description: "Registe and login ",
        }
      },
      {
        name: "Conducteur",
        description: "Conducteur end point",
        externalDocs: {
          description: "Find conductors thing",
        }
      },
      {
        name: "Voyageur",
        description: "voyageur end point ",
        externalDocs: {
          description: "Find voyageur thing",
        }
      },
      {
        name: "Admin",
        description: "Admin  action",
        externalDocs: {
          description: "Find out more",
        }
      },
      ],
      paths:{
        "/v1/login":{
            post:{
                tags:[
                    "User Account"
                ],
                description: "User login",
                requestBody:{
                    description:"User Login",
                    content:{
                        "application/json":{
                            schema:{
                                $ref: '#/components/schemas/Login'
                            }
                        }
                    },
                    required: true
                },
                responses:{
                    "200":{
                        description:"Success",
                        content:{
                            "application/json":{
                                schema:{
                                    $ref: '#/components/schemas/LoginRes'
                                }
                            }
                        }
                    },
                    "404":{
                        description:"No Found",
                    },
                    "500":{
                        description:"Error Servers"
                    }
                }
                
            }
        },
        "/v1/register":{
            post:{
                tags:[
                    "User Account"
                ],
                description: "User Create account ",
                requestBody:{
                    description:"User Create account",
                    content:{
                        "application/json":{
                            schema:{
                                $ref:'#/components/schemas/Register'
                            }
                        }
                    },
                    required: true
                },
                responses:{
                    "200":{
                        description:"Success",
                        content:{
                            "application/json":{
                                schema:{
                                    $ref: '#/components/schemas/RegisterResponse'
                                }
                            }
                        }
                    },
                    "400":{
                        description:"Already existing",
                    },
                    "404":{
                        description:"No Found"
                    },
                    "500":{
                        description:"Error Servers"
                    }
                }
                
            }
        },
        "/v1/users":{
            get:{
                tags:[
                    "Admin"
                ],
                description: "Admin get all users ",
                responses:{
                    "200":{
                        description:"Success",
                    },
                    "401":{
                        description:"Unauthorized",
                    },
                    "404":{
                        description:"No Found"
                    },
                    "500":{
                        description:"Error Servers"
                    }
                },
                security:{
                    "api_key" : []
                }
                    
                
       
                
            }
        }
      },
      components: {
        schemas:{
            Login:{
                type: "object",
                properties:{
                    tels:{
                        type: "string",
                    },
                    password:{
                       type:"string" 
                    }
                },
                required:true
            },
            LoginRes:{
                type: "object",
                properties:{
                    access_token:{
                        type: "string",
                    }
                },
                required:true
            },
            Register:{
                type: "object",
                properties:{
                    nom:{
                        type: "string",
                    },
                    prenoms:{
                        type: "string"
                    },
                    genre:{
                        type:"string",
                        description:"genre (homme ou femme)"
                    },
                    email:{
                        type: "string"
                    },
                    password:{
                        type: "string"
                    },
                    pays:{
                        type: "string"
                    },
                    tels:{
                        type: "string",
                        description:"phone number"
                    },
                    dateNaissance: {
                        type: "string"
                    }
                },
                required:true
            },
            RegisterResponse:{
                type: "object",
                properties:{
                    nom:{
                        type: "string",
                    },
                    prenoms:{
                        type: "string"
                    },
                    genre:{
                        type:"string"
                    },
                    profil:{
                        type: "string"
                    },
                    email:{
                        type: "string"
                    },
                    password:{
                        type: "string"
                    },
                    pays:{
                        type: "string"
                    },
                    tels:{
                        type: "string"
                    },
                    dateNaissance: {
                        type: "string"
                    },
                    updatedAt:{
                        type:"string",
                        format: "date-time"
                    },
                    createdAt:{
                        type:"string",
                        format: "date-time"
                    }
                },
                required:true
            }
        },
        securitySchemes: {
          api_key: {
            type: 'apiKey',
            name: 'api_key',
            in: 'header',
          },
        },
      },
    },
    apis: ["app.js"],
  };
  



  module.exports={
    swaggerOptions,
  }