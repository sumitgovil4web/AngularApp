angular.module('profileapp')
.controller('ContactsCtrl', ['$log', '$scope', '$firebaseArray', function($log, $scope, $firebaseArray){
  $log.log('Inside Contacts Controller');

  //Make Firebase connection
  var ref = firebase.database().ref('contacts');
  $scope.contacts = $firebaseArray(ref);

  $scope.addContactForm = false;

  $scope.showAddContactForm = function(){
    $scope.addContactForm = true;
  };

  $scope.hideAddContactForm = function(){
    $scope.addContactForm = false;
  };

  $scope.addContact = function() {
    $log.log('Adding Contact ...');
    $scope.contacts.$add({
        name: {firstname: $scope.firstname != null? $scope.firstname : null,
        middlename: $scope.middlename != null? $scope.middlename : null,
        lastname: $scope.lastname != null? $scope.lastname : null,
      },
      email: $scope.email != null? $scope.email : null,
      remarks: $scope.remarks != null? $scope.remarks : null
    }).then(function(ref){
      //$log.log('Contact added with ID: ' + ref.key());

      //clearFields();
      $scope.addContactForm = false;

    });
  };

  $scope.showContactDetails = function(contact){
    $log.log('Getting Contact ...');
    $scope.contactClicked = true;
    $scope.firstname = contact.name.firstname;
    $scope.middlename = contact.name.middlename;
    $scope.lastname = contact.name.lastname;
    $scope.email = contact.email;
    $scope.remarks = contact.remarks;

  };

  $scope.hideContactDetails = function(){
    $scope.contactClicked = false;
  }

}]);
