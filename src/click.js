angular.module('ranks',[])
    .controller('ranksCtrl',RanksCtrl)
    .factory('ranksApi',RanksApi)
    .constant('apiUrl','http://localhost:1337');

function RanksCtrl($scope,RanksApi) {

    $scope.apiKey="u66e7we2se22mzqxsdezwn2vr3wm8x69";
    $scope.blizzardApi="https://us.api.battle.net/sc2/"
    $scope.ladderApi="ladder/:"
    $scope.profileApi="profile/:"
    $scope.playerIDs=[];
    $scope.playerRegions=[];
    $scope.playerNames=[];
    $scope.ladderIDs=[];
    $scope.playerProfile=[];


}

