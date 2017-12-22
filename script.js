
$(document).ready(function()
{

//VARIABLES TO STORE THE FILES TEXT
var stop_words_text ="";
var book_text = "";


//_READ_STOP_WORD_FILE_==============================================================================//
//  Read a given stop-word textfile and return an array of stop-word strings.
//===================================================================================================//
function Get_Stop_Word_List(text) 
{
    var stopwords = text.split("#"); //divide the text by "#"
    stopwords = stopwords.pop(); //get the last element, it has the stopwords
    stopwords = stopwords.toLowerCase().split(/\s/g); //split by whitespace
    var sw = [];
    for(var w in stopwords){if(stopwords[w]!=""){ sw.push(stopwords[w]); }} //remove "" elements
    return sw;
}
//===================================================================================================//


//_READ_BOOK_FILE_===================================================================================//
//  Read a given book textfile and return an array of book word strings.
//  This excludes the header and footer sengments of the file. It will only work for text files 
//  with the following format [header *** header2 *** content *** footer... ].
//===================================================================================================//
function Get_Book_Word_List(text)
{
    words = text.split('***')[2].toLowerCase(); //get element [2] the content of the book
    //remove punctuation marks
    var text2 = ""; //stores the text characters present in valid_char only
    var chk1 = document.getElementById('hypen_words').checked; //enable/disable hypen words and abreviations
    var chk2 = document.getElementById('numbers_dates').checked; //enable/disable numbers and dates
    var valid_char = "abcdefghijklmnopqrstuvwxyz"+((chk1)?"’-":"")+((chk2)?"0123456789":"");
    for(var i=0; i<words.length; i++)
    {
        //if the char is valid add it to text2, otherwise ad a whitespace
        text2 += ((valid_char.indexOf(words[i])>-1)? words[i] : " ");
    }
    words = text2.split(/\s/g); //split the text in to an array of word strings
    return words.filter(function(element){ return element!=="’";}); //remove "’" elements and return the list
}
//===================================================================================================//


//_REMOVE_STOP_WORDS_================================================================================//
//  Given a content word list and a stop word list, remove the stop words from the content list.
//===================================================================================================//
function Remove_Stop_Words(content, stop_words)
{
    //create a new list without the stop-words
    var words = [];
    for(var i=0; i<content.length; i++)
    {
        //if an item is not in stop_words it will return -1
        if(stop_words.indexOf(content[i])==-1)
        {
            words.push(content[i]); //add the element to the new list, since is not on the stop_words
        }
    }
    return words;     //return new word list
}
//===================================================================================================//


//_PERFORM_WORD_COUNT================================================================================//
//  Given a content word list, counts the ocurrences of each word and returns list of tupples 
//  that contain (word, number_of_ocurrences), and is sorted by the number_of_ocurrences.
//===================================================================================================//
function Perform_Word_Count(content)
{
	var ocurrences = {}
    for(var i=0; i<content.length; i++)
    {
        //if this key is in the dict
        if(content[i] in ocurrences)
        {
            ocurrences[content[i]]++; //add 1 to the counter
        }
        else //this is a new key in the dict
        {
            ocurrences[content[i]] = 1; //otherwise set its value to 1
        }   
    }
    //turn dict into sorted list and return
    var key_value_list = [];
    for(var key in ocurrences) 
    {
        key_value_list.push([key, ocurrences[key]]);
    }
    return key_value_list.sort(function(a, b){ return b[1] - a[1]; }); //retrun sorted by descending order
}
//===================================================================================================//


//_LOAD_STOP_WORDS_FILE_=============================================================================//
//  Function called when there's a change in the "upload_stopwords" document element.
//  Reads the given file and stores it in stop_words_text.
//===================================================================================================//
function Load_Stop_Words_File(evt)
{
    if(evt.target.files[0]) //if the file is available
    {
        var reader = new FileReader(); //create new reader file
        reader.readAsText(evt.target.files[0]); //get file
        reader.onload = function(e) //wait for the file to load
        {
            stop_words_text = reader.result; //store the result
			Enable_Word_Count_Button(); //check if the Word Count button can be enabled
        };
    }
}
//===================================================================================================//


//_LOAD_BOOK_FILE_===================================================================================//
//  Function called when there's a change in the "upload_stopwords" document element.
//  Reads the given file and stores it in book_text.
//===================================================================================================//
function Load_Book_File(evt)
{
    if(evt.target.files[0]) //if the file is available
    {
        var reader = new FileReader(); //create new reader file
        reader.readAsText(evt.target.files[0]); //get file
        reader.onload = function(e) //wait for the file to load
        {
            book_text = reader.result; //store the result
			Enable_Word_Count_Button(); //check if the Word Count button can be enabled
        };
    }
}
//===================================================================================================//


//_ENABLE_WORD_COUNT_BUTTON_=========================================================================//
//  Enables the word count button if the two files are loaded, disables it otherwise
//===================================================================================================//
function Enable_Word_Count_Button()
{
    var enabled = (stop_words_text.length>0 && book_text.length>0);
    document.getElementById('perform_word_count').disabled = !enabled;
	$("#results").fadeOut( "slow", function() {});
}
//===================================================================================================//


//PERFORM_WORD_COUNT_ON_CLICK========================================================================//
//  Call the Perform_Word_Count() function when the 'perform_word_count' button is clicked
//===================================================================================================//
function Click_Word_Count_Button()
{
    console.log("clicked "+stop_words_text.length+" "+book_text.length);
    if(stop_words_text.length>0 && book_text.length>0)
    {
        //REMOVE STOP WORDS AND COUNT THE WORDS
        var stop_word_list = Get_Stop_Word_List(stop_words_text);
        var book_word_list = Get_Book_Word_List(book_text);
        var book_word_content = Remove_Stop_Words(book_word_list, stop_word_list);
        var result = Perform_Word_Count(book_word_content);
        var resultHTML = "<strong>Top 100 words:</strong>";
        resultHTML += "<table><tr><th>NUMBER</th><th>WORD</th><th>NUMBER OF OCURRENCES</th>";
        
        //limit the results to the top 100
        for(var i=1; i<result.length && i<=100; i++) 
        {
            resultHTML += "<tr><td><strong>"+i+"</strong></td><td>"+result[i][0]+"</td><td>"+result[i][1]+"<tr>"
        }
        
        //UPDATE HTML TO DISPLAY RESULTS
        document.getElementById('results').innerHTML = resultHTML+"</table>";
		$("#results").fadeIn( "slow", function() {});
		
		//reset
		document.getElementById('perform_word_count').disabled = true;
		stop_words_text = "";
		book_text = "";
		document.getElementById('upload_stopwords').value = "";
		document.getElementById('upload_book').value = "";
    }
};
//===================================================================================================//


//ADD EVENT LISTENERS
document.getElementById('upload_stopwords').addEventListener('change', Load_Stop_Words_File, false);
document.getElementById('upload_book').addEventListener('change', Load_Book_File, false);
document.getElementById('perform_word_count').addEventListener('click', Click_Word_Count_Button, false);

//DISABLE WORD COUNT BUTTON
Enable_Word_Count_Button();


});
