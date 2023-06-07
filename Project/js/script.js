$(function(){
    $("#navbarToggle").blur(function(event){
        var screenwidth = window.innerWidth;
        if (screenwidth < 768){
            $("#collapsable-nav").collapse('hide');
        }
    });
});


(function (global){
    var dc={}

    var homeHtml = "snippets/home-snippet.html";
    var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";
    var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html"

    var switchMenuToActive = function(){
        var classes = document.querySelector("#navHomeButton").className;
        classes = classes.replace(new RegExp("active", "g"), "")
        document.querySelector("#navHomeButton").className = classes;

        classes = document.querySelector("#navMenuButton").className;
        if (classes.indexOf("active")== -1){
            classes+=" active";
            classes = document.querySelector("#navMenuButton").className = classes;
        };
    };

    var insertHtml = function(selector,html){
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    var showLoading = function (selector){
        var html = "<div class='text-center'><img src='images/ajax-loader.gif'></div>";
        insertHtml(selector,html);
    };


    var insertProperty = function(string, propName, propValue){
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp (propToReplace, "g"), propValue);
        return string;
    };

    document.addEventListener("DOMContentLoaded", function(event){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allCategoriesUrl,buildAndShowHomeHTML, true)
        
    });

    // Builds HTML for the home page based on categories array
    // returned from the server.
    function buildAndShowHomeHTML (categories) {

        // Load home snippet page
        $ajaxUtils.sendGetRequest( homeHtml, function (homeHtml) {
            var chosenCategory = chooseRandomCategory(categories);
            var chosenCategoryShortName = "'" + chosenCategory.short_name + "'";
            // console.log(chosenCategoryShortName);
            homeHtml = insertProperty(homeHtml, "randomCategoryShortName", chosenCategoryShortName);
            
            insertHtml("#main-content", homeHtml);

            // TODO: STEP 2: Here, call chooseRandomCategory, passing it retrieved 'categories'
            // Pay attention to what type of data that function returns vs what the chosenCategoryShortName
            // variable's name implies it expects.
            // var chosenCategoryShortName = ....
    
    
            // TODO: STEP 3: Substitute {{randomCategoryShortName}} in the home html snippet with the
            // chosen category from STEP 2. Use existing insertProperty function for that purpose.
            // Look through this code for an example of how to do use the insertProperty function.
            // WARNING! You are inserting something that will have to result in a valid Javascript
            // syntax because the substitution of {{randomCategoryShortName}} becomes an argument
            // being passed into the $dc.loadMenuItems function. Think about what that argument needs
            // to look like. For example, a valid call would look something like this:
            // $dc.loadMenuItems('L')
            // Hint: you need to surround the chosen category short name with something before inserting
            // it into the home html snippet.
            //
            // var homeHtmlToInsertIntoMainPage = ....
    
    
            // TODO: STEP 4: Insert the produced HTML in STEP 3 into the main page
            // Use the existing insertHtml function for that purpose. Look through this code for an example
            // of how to do that.
            // ....
    
        },
        false); // False here because we are getting just regular HTML from the server, so no need to process JSON.
    }
    
    
    // Given array of category objects, returns a random category object.
    function chooseRandomCategory (categories) {
        // Choose a random index into the array (from 0 inclusively until array length (exclusively))
        var randomArrayIndex = Math.floor(Math.random() * categories.length);
    
        // console.log(categories[randomArrayIndex]);
        return categories[randomArrayIndex];
    }




    dc.loadMenuCategories = function(){
        showLoading("#main-content");
        
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
    };

    dc.loadMenuItems = function(categoryShort){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort + ".json", buildAndShowMenuItemsHTML);
    };

    function buildAndShowCategoriesHTML (categories){
        $ajaxUtils.sendGetRequest(categoriesTitleHtml,function (categoriesTitleHtml){
            $ajaxUtils.sendGetRequest(categoryHtml, function(categoryHtml){
                switchMenuToActive();
                var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml,categoryHtml);
                insertHtml("#main-content", categoriesViewHtml);

            },
            false);
        },
        false);
    };

    function buildAndShowMenuItemsHTML (categoryMenuItems){
        $ajaxUtils.sendGetRequest(menuItemsTitleHtml,function (menuItemsTitleHtml){
            $ajaxUtils.sendGetRequest(menuItemHtml, function(menuItemHtml){
                switchMenuToActive();
                var menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml);
                insertHtml("#main-content", menuItemsViewHtml);

            },
            false);
        },
        false);
    };

    function buildMenuItemsViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml){

        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"name",categoryMenuItems.category.name);
        // console.log(categoryMenuItems.category.special_instructions);
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"special_instructions",categoryMenuItems.category.special_instructions);
        var finalHtml = menuItemsTitleHtml;
        finalHtml += "<section class='row'>";

        var menuItems = categoryMenuItems.menu_items;
        var catShortName = categoryMenuItems.category.short_name;
        for (var i =0; i< menuItems.length; i++){
            var html = menuItemHtml;
            html = insertProperty(html, "short_name", menuItems[i].short_name);
            html = insertProperty(html, "catShortName", catShortName);
            // console.log(menuItems[i].price_small === 'undefined');
            if (menuItems[i].price_small == undefined){
                html = insertItemPrice(html, "price_small", "");
                html = insertItemPortionName(html, "small_portion_name", "");
            }else{
                html = insertItemPrice(html, "price_small", menuItems[i].price_small);
                html = insertItemPortionName(html, "small_portion_name", "Pint");

            };
            
            if (menuItems[i].price_large == undefined){
                html = insertItemPrice(html, "price_large", "");
                html = insertItemPortionName(html, "large_portion_name", "");
            }else{
                html = insertItemPrice(html, "price_large", menuItems[i].price_large);
                html = insertItemPortionName(html, "large_portion_name", "Quart" );
            };
            
            html = insertProperty(html, "name", menuItems[i].name);
            html = insertProperty(html, "description", menuItems[i].description);

            if ( i%2 !=0){
                html += "<div class = 'clearfix visible-lg-block visible-md-block'></div>"
            }

            finalHtml += html

        };
        finalHtml += "</section>";
        return finalHtml;
    };

    // Appends price with '$' if price exists
  function insertItemPrice(html, pricePropName, priceValue) {
    // If not specified, replace with empty string
    if (!priceValue) {
      return insertProperty(html, pricePropName, "");
    }

    priceValue = "$" + priceValue.toFixed(2);
    html = insertProperty(html, pricePropName, priceValue);
    return html;
  }

  // Appends portion name in parens if it exists
  function insertItemPortionName(html, portionPropName, portionValue) {
    // If not specified, return original string
    if (!portionValue) {
      return insertProperty(html, portionPropName, "");
    }

    portionValue = " (" + portionValue + ") ";
    html = insertProperty(html, portionPropName, portionValue);
    return html;
  }



    function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml){
        var finalHtml = categoriesTitleHtml;
        finalHtml+="<section class = 'row'>";

        for (var i=0; i<categories.length; i++){
            var html = categoryHtml;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;

            html = insertProperty (html, "name", name);
            html = insertProperty(html, "short_name",short_name)

            finalHtml+=html;
        };

        finalHtml +="</section>"
        return finalHtml

    };

    


    global.$dc = dc;
})(window);