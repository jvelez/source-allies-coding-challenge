
$(document).ready(function()
{

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


});
