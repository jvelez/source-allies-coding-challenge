
import string

#_READ_STOP_WORD_FILE_=============================================================================#
# Read a given stop-word textfile and return a string array with the stop-words.
#==================================================================================================#
def Get_Stop_Word_List(file_name):
	file = open(file_name,encoding='utf-8') #open the given file
	words = file.read().split() #split the file into an array of strings
	return list(set(words[words.index("a"):])) #remove unnecesary elements and return list
#==================================================================================================#


#_READ_BOOK_FILE_==================================================================================#
# Read a given book textfile and return a string array with the all words in the book.
# This excludes the header and footer sengments of the file. It will only work for text files 
# with the following format [header *** header2 *** content *** footer... ].
#==================================================================================================#
def Get_Book_Word_List(file_name):
	file = open(file_name,encoding='utf-8') #open the given file
	lines = file.read().split('***')[2] # get element [2] the content of the book
	lines = lines.translate(str.maketrans('', '', string.punctuation)) #remove punctuation marks
	return lines.split() #split into an array of strings and return list
#==================================================================================================#


#Test the function by printing out the resulting list.
print(Get_Book_Word_List("mobydick.txt"))
