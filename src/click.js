angular.module('ranks',[])
    .controller('ranksCtrl',RanksCtrl)
    .factory('ranksApi',ranksApi)
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

    function buttonClick($event) {
      $scope.errorMessage='';
      if($event.target.id == 1) {
        async.series([
          function(callback) {
              ranksApi.getProfileRaw(searchProfileId, searchProfileName)
              .success(function(data) {
                $scope.playerProfileDataRaw=data;
              })
              .error(function () {
                $scope.errorMessage="Unable to get data for profile: Blizzard API Request Failed"
              })
              callback();
          },
          function(callback){
            parseProfileRaw();
            callback();
          },
          function(callback) {
            ranksApi.insertProfile(playerProfileData);
            callback()
          }

        ]

        )
      }
    }

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

    function getProfile() {
      $scope.errorMessage='';
      ranksApi.getProfile($event.target.id)
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
          getLadder();
        })
        .error(function() {
          $scope.errorMessage='Error fetching ladder data from blizzard api';
        })
    }

    function getProfileRaw(){ // Fetch the profile JSON from blizzard
      $scope.errorMessage='';
      ranksApi.getProfileRaw($scope.searchProfileId, $scope.searchProfileName)
      .success(function(data) {
        $scope.playerProfileDataRaw=data;
      })
      .error(function() {
        $scope.errorMessage='Error fetching profile data from blizzard api';
      })
    }
    function parseProfileRaw() {
      console.log("Parsing player profile JSON");
      var data = [];
      if ($scope.playerProfileDataRaw.id in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.id);
      } else {data.push(null);}
      if ($scope.playerProfileDataRaw.displayName in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.displayName);
      } else {data.push(null);}
      if ($scope.playerProfileDataRaw.clanName in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.clanName);
      } else {data.push(null);}
      if ($scope.playerProfileDataRaw.clanTag in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.clanTag);
      } else {data.push(null);}
      if ($scope.playerProfileDataRaw.career.terranWins in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.career.terranWins);
      } else {data.push(null);}
      if ($scope.playerProfileDataRaw.career.protossWins in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.career.protossWins);
      } else {data.push(null);}
      if ($scope.playerProfileDataRaw.career.zergWins in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.career.zergWins);
      } else {data.push(null);}
      if ($scope.playerProfileDataRaw.career.highest1v1Rank in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.career.highest1v1Rank);
      } else {data.push(null);}

      if ($scope.playerProfileDataRaw.career.seasonTotalGames in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.career.seasonTotalGames);
      } else {data.push(null);}
      if ($scope.playerProfileDataRaw.career.careerTotalGames in $scope.playerProfileDataRaw) {
        data.push($scope.playerProfileDataRaw.career.careerTotalGames);
      } else {data.push(null);}

      for (var i = 0; i < $scope.playerProfileDataRaw.season.stats.length; i++) {
        switch($scope.playerProfileDataRaw.season.stats[i].type) {
          case "1v1":
            data[10] = $scope.playerProfileDataRaw.season.stats[i].wins;
            data[11] = $scope.playerProfileDataRaw.season.stats[i].games;
            break;
          case "2v2":
            data[12] = $scope.playerProfileDataRaw.season.stats[i].wins;
            data[13] = $scope.playerProfileDataRaw.season.stats[i].games;
            break;
          case "3v3":
            data[14] = $scope.playerProfileDataRaw.season.stats[i].wins;
            data[15] = $scope.playerProfileDataRaw.season.stats[i].games;
            break;
          case "4v4":
            data[16] = $scope.playerProfileDataRaw.season.stats[i].wins;
            data[17] = $scope.playerProfileDataRaw.season.stats[i].games;
            break;
        }
      }
      $scope.playerProfileData=data;
      console.log("Finished parsing player profile");
    }

    function parseLadderRaw() {
      console.log("Parsing ladder JSON");
      var data = [];
      for (var i = 0; i<$scope.ladderDataRaw.ladderMembers.length; i++) {

      $scope.ladderData = data;
    }
    }
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
          "/ladder/"+id+"?locale=en_US&apikey="+$scope.apikey;
          return $http.get(url); // May need to fix this call
        },
        getProfileRaw(id, name){
          var url = blizzardAPIURL +
          "/profile/"+id+"/1/"+name+"/?locale=en_US&apikey="+$scope.apikey;
          return $http.get(url); // May ned to fix this call
        },
        insertProfile(profileData){
          var url = apiUrl + "/insertProfile?pd="+profileData;
          return $http.get(url);
        },
        insertLadder(ladderData){
          var url = apiUrl + "/insertLadder?ld="+ladderData;
          return $http.get(url);
        }
      }
    }
