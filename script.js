
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


});