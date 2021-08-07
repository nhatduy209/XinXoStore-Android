
import firebase from 'firebase';
import { Status } from '../Config/dataStatus';
import _, { map } from 'underscore';
import { PushData } from './PushData';
import { async } from 'rxjs';
import { sendNotification } from '../Common/PushNotification'


export default class ReadService {
  verifyLoginApi = async (username, password) => {
    let canLogin = false;
    let Email = "";
    let key = "";
    let user = {};
    console.log("SERVICE ", username, password);
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          if (myJson.Username === username && myJson.Password === password) {
            canLogin = true;
            key = child.key;
            user = myJson;
          }
        });
      });
    if (canLogin === true) {
      return {
        data: {
          user,
          key,
        },
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {
        },
        status: Status.FAIL,
      }

    }
  }
  signUpApi = async (email, username, password, age) => {
    let canSignUp = true;
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          if (myJson.Email === email) {
            canSignUp = false;
          }
        });
      });

    if (canSignUp === true) {
      return {
        data: {},
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {
        },
        status: Status.FAIL
      };
    }
  }

  // truyền đô đây nè mẹ
  getArrivalItemAPI = async (Name) => {
    let key = "";
    let item = {};
    var listItem = [];
    await firebase
      .database()
      .ref('NewArrivals/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          //đặt ddieuf kiện
          var myJson = child.toJSON();
          if (myJson.Name === Name) {
            key = child.key;
            item = myJson;
            listItem.push({ key, item });
          }
        });
      });
    if (listItem.length > 0) {
      return {
        data: { listItem },
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {},
        status: Status.FAIL,
      }
    }
  }
  getListArrivalsAPI = async (sortUp) => {
    let key = "";
    let item = {};
    var listItem = [];
    await firebase
      .database()
      .ref('NewArrivals/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          //đặt ddieuf kiện
          var myJson = child.toJSON();
          key = child.key;
          item = myJson;
          listItem.push({ key: key, ...item });
        });
      });
    if (listItem.length > 0) {
      listItem = _.sortBy(listItem, 'prices')
      if (!sortUp) {
        listItem.reverse();
      }
      return {
        data: {
          listItem
        },
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {},
        status: Status.FAIL,
      }
    }
  }
  getListReviewsAPI = async (ownerId,) => {
    let key = "";
    let item = {};
    var listItem = [];
    await firebase
      .database()
      .ref('Reviews/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          //đặt ddieuf kiện
          var myJson = child.toJSON();
          key = child.key;
          item = myJson;
          if (item.ShopId === ownerId) {
            listItem.push({ key: key, ...item });
          }

        });
      });
    if (listItem.length > 0) {
      return {
        data: {
          listItem
        },
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {},
        status: Status.FAIL,
      }
    }
  }
  getListAddressApi = async (idAccount) => {
    let address = [];
    await firebase.database().ref('Account/' + idAccount).once('value', function (snapshot) {
      snapshot.forEach(function (child) {
        if (child.key == "Address") {
          child.forEach(function (item) {
            address.push({ key: item.key, data: item.toJSON() });
          });
        }
      });
    });
    if (address.length > 0) {
      return {
        data: {
          address
        },
        status: Status.SUCCESS
      };
    } else {
      return {
        data: {},
        status: Status.FAIL,
      }
    }
  }
  getDefaultAddress = async (idAccount) => {
    var address = new Object();
    await firebase.database().ref('Account/' + idAccount).once('value', function (snapshot) {
      snapshot.forEach(function (child) {
        if (child.key == "Address") {
          child.forEach(function (item) {
            if (item.toJSON().Default == true) {
              address = item.toJSON();
              return;
            }
          });
        }
      });
    });
    if (!!address) {
      return {
        status: Status.SUCCESS,
        data: {
          address
        }
      }
    } else {
      return {
        status: Status.FAIL,
        data: {}
      }
    }
  }

  getShoppingCart(idAccount) {
    return firebase.database().ref("Account/" + idAccount).once('value').then(function (snapshot) {
      var reads = [];
      let totalBill = 0;
      snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.key == "Cart") {
          childSnapshot.forEach(function (child) {
            var promise = firebase.database().ref('NewArrivals/' + child.toJSON().ItemID).once('value').then(function (snap) {
              // The Promise was fulfilled.
              var myJson = snap.toJSON();
              var item = {
                key: snap.key,
                data: myJson
              };
              reads.push(item);
              return item;
            },
              function (error) {
                // The Promise was rejected.
                console.error(error);
              });
            reads.push(promise);
          })
        }

      });
      return Promise.all(reads);
    }, function (error) {
      // The Promise was rejected.
      console.error(error);
    }).then(function (values) {
      if (values.length >= 0) {
        return {
          data: values,
          status: Status.SUCCESS,
        }
      }
      else {
        return {
          data: {},
          status: Status.FAIL,
        }
      }
    });
  }
  getListIDItemShoppingCart = async (idAccount) => {
    let listItem = [];
    await firebase.database().ref('Account/' + idAccount).once('value', function (snap) {
      snap.forEach(function (child) {
        if (child.key == "Cart") {
          child.forEach(function (id) {
            listItem.push(id.toJSON().ItemID);
          });
          return;
        }
      })
    })

    if (listItem.length > 0) {
      return {
        data: listItem,
        status: Status.SUCCESS
      }
    }
    else {
      return {
        data: {},
        status: Status.FAIL
      }
    }
  }
  getListItemShoppingCart = async (listItemID) => {
    let listItem = [];
    listItemID.forEach(async function (id) {
      await firebase.database().ref('NewArrivals/' + id).once('value', function (snap) {
        listItem.push({ key: id, data: snap.toJSON() });

      })
      console.log(listItem);
    })
    console.log(listItem);
    if (listItem.length > 0) {
      return {
        data: listItem,
        status: Status.SUCCESS
      }
    }
    else {
      return {
        data: {},
        status: Status.FAIL
      }
    }
  }

  getPublisherInfo = async (ownerId) => {
    var publisher = {}
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          if (child.key === ownerId) {
            var myJson = child.toJSON();
            publisher = myJson;
          }
        });
      });

    return {
      data: publisher,
      status: Status.SUCCESS
    }
  }
  getItemForUser = async (idOwner) => {
    let listItem = [];
    let listItemObject = [];

    let listItemBill = [];

    await firebase
      .database()
      .ref('Bill/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          //đặt ddieuf kiện
          console.log('CHILD-------', child)
          var myJson = child.toJSON();
          listItemBill.push(myJson);
        });
      })


    await firebase
      .database()
      .ref('NewArrivals/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          //đặt ddieuf kiện
          var myJson = child.toJSON();
          if (myJson.ownerId === idOwner) {
            let myObject = {
              img: "",
              Name: "",
              Category: "",
              publicDate: "",
              ownerShop: "",
              prices: 0,
              sold: false,
              itemID: child.key,
              isShipped: false,
              customerId: "",
            };
            const myBill = _.findWhere(listItemBill, { ItemID: Number(myObject.itemID) });
            myObject.img = myJson.img;
            myObject.Name = myJson.Name;
            myObject.Category = myJson.Category;
            myObject.publicDate = myJson.publicDate;
            myObject.ownerShop = myBill.Username;
            myObject.prices = myJson.prices;
            myObject.sold = myJson.sold;
            myObject.isShipped = myBill.isShipped;
            myObject.customerId = myBill.UserID;
            const toArray = _.values(myObject);
            listItemObject.push(myObject);
            listItem.push(toArray);
          }
        });
      }).then(res => {
        console.log('RES', listItemObject);
      }).catch(err => {
        console.log("ERR ", err)
        return {
          data: {},
          status: Status.FAIL,
        };
      });

    return {
      data: { listItem, listItemObject },
      status: Status.SUCCESS,
    };
  }

  getUserToken = async (userID, username) => {
    console.log('ID', userID)
    let listToken = [];
    await firebase
      .database()
      .ref('Account/' + 2 + '/' + 'Notifications/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          listToken.push(myJson.tokenID);
        });
      })

    listToken.forEach(item => {
      sendNotification('Xác nhận đơn hàng', 'Đơn hàng của bạn đã được người bán ' + username + ' giao thành công', item);
    })


    console.log('LIST TOKEN ---------', listToken)
  }

  getListMessage = async () => {
    let listMessage = [];
    await firebase
      .database()
      .ref('Messages/' + 'nhatduy209-thuyety/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          var myJson = child.toJSON();
          listMessage.push(myJson);
        });
      }).catch(err => {
        return {
          data: {},
          status: Status.FAIL,
        }
      })

    return {
      data: listMessage.reverse(),
      status: Status.SUCCESS
    }
  }


  getUserAvatarByName = async (username) => {
    var publisher = {}
    await firebase
      .database()
      .ref('Account/')
      .once('value', function (snapshot) {
        snapshot.forEach(function (child) {
            var myJson = child.toJSON();
            if(myJson.Username === username){

            }
        });
      });

    return {
      data: publisher,
      status: Status.SUCCESS
    }
  }


  getBubbleMessage = async (usernameLogin) => {

    let ListBubble = [];

    // get avatar user chatting 
   
     


    // get bubble chat
    await firebase
      .database()
      .ref('Messages/')
      .once('value', function (snapshot) {

        snapshot.forEach(function (child) {
          let lastBubble = [];
          let BubbleObject = {
            usernameChatting: "",
            lastMessage: {}, 
            keyMessage:"",
            userChatAvatar : "",
          };
       
          const countElement = child.numChildren();
          child.forEach(function (childSnap) {
            if (child.key.indexOf(usernameLogin) !== -1 && child.key.indexOf(usernameLogin) === 0) {
              lastBubble.push(childSnap.toJSON());
              BubbleObject.usernameChatting = child.key.slice(usernameLogin.length + 1);
             
              if(BubbleObject.usernameChatting === childSnap.toJSON().user.name){
                BubbleObject.userChatAvatar = childSnap.toJSON().user.avatar;
              }
              BubbleObject.keyMessage = child.key;
            }
            else if (child.key.indexOf(usernameLogin) !== -1 && child.key.indexOf(usernameLogin) !== 0) {
              lastBubble.push(childSnap.toJSON());
              BubbleObject.usernameChatting = child.key.slice(0,child.key.length -  (usernameLogin.length+1));
              if(BubbleObject.usernameChatting === childSnap.toJSON().user.name){
                BubbleObject.userChatAvatar = childSnap.toJSON().user.avatar;
              }
              BubbleObject.keyMessage = child.key;
            }
          })
          BubbleObject.lastMessage = lastBubble[countElement - 1]; 
          if (BubbleObject.lastMessage !== undefined) {
            ListBubble.push(BubbleObject);
          }
        });

      }).catch(err => {
        return {
          data: ListBubble,
          status: Status.FAIL,
        }
      })

      return {
        data : ListBubble ,
        status : Status.SUCCESS
      }
  }
}