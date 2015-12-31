'use strict';

/* App Module */
//https://developer.nutritionix.com/
//account required
var appID = '8123a821';
var appKey = '82b3842689f4fed71b105c1619ead491';
var baseurl = 'https://api.nutritionix.com/v1_1/search/{0}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId={1}&appKey={2}';

angular.module('nutritionApp', [])
  .controller('SearchCtrl', function($scope, $http){
    var pending;

    //wait and see if more charachters are coming
    //cuts down on api requests
    $scope.inputChange = function(){
      if(pending){
        clearTimeout(pending);
      }
      pending = setTimeout(fetch, 500);
    };

    function fetch(){
    	var queryURL = format(baseurl,[$scope.searchinput, appID, appKey]);
    	console.log(queryURL);
     	$http.get(queryURL)
       	 .success(function(response){ $scope.results = response.hits; });
    }

	function format(source, params) {

  		for(var i = 0; i < params.length; i++){
  			source = source.replace(new RegExp("\\{" + i + "\\}"), params[i]);
  		}

	    return source;
	}
  });