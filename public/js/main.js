jQuery(document).ready(function($) {
    console.log("In Index.js file");
    /*On click function for Get button on twitter page which will fectch and populate related tweets*/
    $('#get_tweets_submit_btn').on('click', function() {
        console.log("inside button function");
        var userInputs = $('#get_tweets_text').val();
        console.log(encodeURIComponent(userInputs));
        if (validateInputs(userInputs)) {
            if (userInputs.includes("@")) {
                console.log("in username if");
                var userName = userInputs.replace("@", "");
                console.log(userName);
                /*Ajax Call for tweets based on username*/
                $.ajax({
                    url: "/tweets/username/",
                    method: "GET",
                    data: "source=" + userName,
                    success: function(data) {
                        var obj = JSON.parse(data);
                        console.log(obj);
                        $('#tweets_container').empty();
                        if (obj.length > 0) {
                            obj.forEach(function(element) {
                                arrangeTweetCards(element);
                            });
                        } else {
                            $('#tweets_container').append("<p><b>No Tweets To Display</b></p>");
                        }

                    }
                });
            } else {

                /*Ajax call to fetch tweets based on hastag and user name*/

                $.ajax({
                    url: "/tweets/",
                    method: "GET",
                    data: "source=" + encodeURIComponent(userInputs),
                    success: function(data) {
                        var obj = JSON.parse(data);
                        console.log(obj.statuses);
                        $('#tweets_container').empty();
                        if (obj.statuses.length > 0) {
                            obj.statuses.forEach(function(element) {
                                arrangeTweetCards(element);
                            });
                        } else {
                            $('#tweets_container').append("<p><b>No Tweets To Display</b></p>");
                        }
                    }
                });
            }
        } else {
            $('#tweets_container').empty();
            $('#tweets_container').append("<p><b>Please attach @ for username and # for hastags at the beginning</b></p>");
        }
    });
    /*Function to arrange Tweet cards on the front end page */
    function arrangeTweetCards(element) {
        var htmlText = "<div class='card border-success mb-3'>" +
            "<div class='card-header bg-transparent border-success'>" +
            "<img src ='" + element['user']['profile_image_url'] + "' class='rounded-circle mr-3' height='50px' width='50px' alt='avatar'>" +
            "<h4 class='card-title font-weight-bold mb-2'><b>" + element['user']['name'] + "</b></h4>" +
            "<p class='acc_name'>@" + element['user']['screen_name'] + "</p>" +
            "<p class='card-text'><i class='far fa-clock pr-2'></i>" + element['created_at'] + "</p>" +
            "</div>";
        if (element['entities']['media'] == undefined && element['text'] !== undefined) {
            console.log("in 1st loop");
            htmlText += "<div class='card-body text-success'>" +
                "<p class='card-text'>" + element['text'] + "</p>";
            if (element['entities']['hashtags'] !== undefined) {
                var hastags_array = element['entities']['hashtags'];
                var tag_text = "";
                hastags_array.forEach(function(tag) {
                    tag_text += " #" + tag['text'];
                });
                htmlText += "<p class='card-text'>" + tag_text + "</p></div>";
            }
        }
        if (element['entities']['media'] !== undefined && element['text'] == undefined) {
            console.log("in 2nd loop");
            if (element['entities']['hashtags'] !== undefined) {
                var hastags_array = element['entities']['hashtags'];
                var tag_text = "";
                hastags_array.forEach(function(tag) {
                    tag_text += " #" + tag['text'];
                });
                htmlText += "<div class='card-body text-success'>";
                htmlText += "<p class='card-text'>" + tag_text + "</p>" +
                    "<div class='media_div'><img src='" + element['entities']['media'][0]['media_url'] + "' class='card-img-top rounded-0' alt='Card image cap'></div></div>";
            } else {
                htmlText += "<div class='card-body text-success'>" +
                    "<div class='media_div'><img src='" + element['entities']['media'][0]['media_url'] + "' class='card-img-top rounded-0' alt='Card image cap'></div></div>";
            }

        }
        if (element['entities']['media'] !== undefined && element['text'] !== undefined) {
            console.log("in 3rd loop");
            htmlText += "<div class='card-body text-success'>" +
                "<p class='card-text'>" + element['text'] + "</p>";
            if (element['entities']['hashtags'] !== undefined) {
                var hastags_array = element['entities']['hashtags'];
                var tag_text = "";
                hastags_array.forEach(function(tag) {
                    tag_text += " #" + tag['text'];
                });
                htmlText += "<p class='card-text'>" + tag_text + "</p>";
            }
            htmlText += "<div class='media_div'><img src='" + element['entities']['media'][0]['media_url'] + "' class='card-img-top rounded-0' alt='Card image cap'></div></div>";

        }
        htmlText += "<div class='card-footer bg-transparent border-success'>" +
            "</div></div>";
        $('#tweets_container').append(htmlText);
    }

    function validateInputs(userInputs) {
        if ((userInputs.charAt(0) == '@') || (userInputs.charAt(0) == '#')) {
            return true;
        } else {
            return false;
        }
    }
});