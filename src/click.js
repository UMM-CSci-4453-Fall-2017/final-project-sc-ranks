angular.module('ranks',[])
    .controller('ranksCtrl',RanksCtrl)
    .factory('ranksApi',RanksApi)
    .constant('apiUrl','http://localhost:1337');

function RanksCtrl($scope,RanksApi) {
    $scope.errorMessage='';
    $scope.apiKey="u66e7we2se22mzqxsdezwn2vr3wm8x69";
    $scope.blizzardAPIURL="https://us.api.battle.net/sc2/ladder";
    $scope.searchButtons=[];
    $scope.ladderData=[];
    $scope.ladderDataRaw=[];
    $scope.playerProfileData=[];
    $scope.playerProfileDataRaw=[];

    function getSearchButtons() {
      $scope.errorMessage='';
      ranksApi.getButtons()
        .success(function(data) {
          $scope.searchButtons = data;
        })
        .error(function() {
          $scope.errorMessage='Error loading search buttons';
        });
    }

    function getProfile($event) {
      $scope.errorMessage='';
      ranksApi.getProfile($event.target.id, $event.target.)
        .success(function(data) {
          $scope.playerProfileData=data;
        })
        .error(function() {
          $scope.errorMessage='Error loading profile';
        });
    }

    function getLadder($event){
      $scope.errorMessage='';
      ranksApi.getLadder($event.target.id)
        .success(function(data) {
          $scope.ladderData = data;
        })
        .error(function() {
          $scope.errorMessage='Error loading ladder';
        });
    }

    function getLadderRaw($event){ // Fetch the profile JSON from blizzard
      $scope.errorMessage ='';
      ranksApi.getLadderRaw($event.target.id)
        .success(function(data) {
          $scope.ladderDataRaw=data;
        })
        .error(function() {
          $scope.errorMessage='Error fetching ladder data from blizzard api';
        })
    }

    function getProfileRaw($event){ // Fetch the profile JSON from blizzard
      $scope.errorMessage='';
      ranksApi.getProfileRaw($event.target.id)
      .success(function(data) {
        $scope.playerProfileDataRaw=data;
      })
      .error(function() {
        $scope.errorMessage='Error fetching profile data from blizzard api';
      })
    }

    function ranksApi($http, apiUrl) {
      return{
        getButtons(id){
          var url = apiUrl + "/searchButtons";
          return $http.get(url);
        },
        getProfile(id){
          var url = apiUrl + "/getProfile?id="+id;
          return $http.get(url);
        },
        getLadder(id){
          var url = apiUrl + "/getLadder?id="+id;
          return $http.get(url);
        },
        getLadderRaw(id){
          var url = blizzardAPIURL +
          "/ladder/"+id+"?locale=en_US&apikey="+apikey;
          return $http.get(url); // May need to fix this call
        },
        getProfileRaw(id, name){
          var url = blizzardAPIURL +
          "/profile/"+id+"/"+"/1/"+name+"/?locale=en_US&apikey="+apikey;
          return $http.get(url); // May ned to fix this call
        }
      }
    }

}
