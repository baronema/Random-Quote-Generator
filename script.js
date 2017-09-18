$(document).ready(function() {
  function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }
  function openURL(url){
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  }
    
    displayQuoteFromArray();

    $("#next_quote").click(function() {
        $('#quote').fadeTo("slow", 0.0);
        $('#author').fadeTo("slow", 0.0);
        getRandomQuote();
    });
    
    function getRandomQuote() {
        $.ajax({
        type: "POST",
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
        dataType: "json",
        success: displayQuote, 

        // display static quote on ajax error
        error: displayQuoteFromArray,
        beforeSend: setHeader,
        
    });

    function setHeader(xhr) {
        xhr.setRequestHeader("X-Mashape-Key", "KHGupidpzhmsh36EaoQo4KF3aOAZp1tjETKjsnz02A2Zu1IkZL");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "application/json");
      }
    }

    function displayQuote(response) {  
            $("#quote").text('"' + response.quote + '"').fadeTo("slow", 1.0);
            $('#author').text('-' + response.author).fadeTo("slow", 1.0);
        }
	
    function displayQuoteFromArray() {
        var myQuotes = [
	        {
	            author: "Plato",
	            quote:"Good people do not need laws to tell them to act responsibly, while bad people will find a way around the laws."
	        },
	        {
	            author: "Friedrich Nietzsche",
	            quote:"He who has a 'why' to live, can bear with almost any 'how'."
	        },
	        {
	            author: "H. G. Wells",
	            quote:"Human history becomes more and more a race between education and catastrophe."
	        },
	        {
	            author: "Ayn Rand",
	            quote:"You can avoid reality, but you cannot avoid the consequences of avoiding reality."
	        },
	        {
	            author: "Jimmy Durante",
	            quote:"Be nice to people on your way up because you meet them on your way down."
        } 
        ];
        var random = Math.floor(Math.random() * 5);
        displayQuote(myQuotes[random]);  
    }
  
  $('#tweet').on('click', function() {
    var quote = $("#quote").text(),
        author = $('#author').text();
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '" ' + author));
    }
  });
    
}); //end of document ready
