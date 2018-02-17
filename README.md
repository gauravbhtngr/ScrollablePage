# Scrollable Page

## scrollable-page is an angular directive, It fetch the data on scroll without any external logic.

### Demo [See demo](https://gauravbhtngr.github.io/Demo/)

### USE

```
angular.module('myApp', ['scrollable-page'])
```

```
<div pageable scroll-distance="3" size="100" next='more(size, page, callback)'>
		<p ng-show="list.length > 0" ng-repeat="number in list">{{number.no}}</p>
</div>
```

## Details

   ```
   <any-tag 
   pageable
   scroll-distance="How far from bottom the data should be fetched"
   >
   ....
   ....
   ....
   </any-tag>
   ```
    
   ```
      pageable          : To make any element scroll pagable, use pageable attribute on element
      scroll-distance   : How far from bottom the data should be fetched, 
                          Default value is bottom touch, you can define 1, 2 etc 1 will be equal to 1000 px above bottom
      size              : Size of the page
      spinner(optional) : Custom spinner image url, if not given then "Loading..." text appear.
      next              : Custom method that fetch the data, Any custom function you create to fetch data from any mean. Provide that function
                          in this attribute and must add size, page, callback parameters as it is.
                          These 3 parameters will be passed from pageable directive and will be available in your custom function.
                          size     : Page size
                          page     : Current page no
                          callback : Some custom logic for pageable directive use.
                          
                          Note : In the custom method callback must be provided with count of current fetched data.
                           
      Example of function (See demo for more info) : 
      function fetchNextPage(size, page, callback) {
       // size can be used if needed
       // current page can be used if needed
       // define callback like below
       callback(count_of_current_fetched_data)
      }
 ```
 
