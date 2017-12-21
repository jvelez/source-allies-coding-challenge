
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


#_REMOVE_STOP_WORDS_===============================================================================#
# Given a content word list and a stop word list, remove the stop words from the content list.
#==================================================================================================#
def Remove_Stop_Words(content, stop_words):
	words = [w for w in content if w not in stop_words] #create a new list without the stop-words
	return words # return word list
#==================================================================================================#


#Load the stop-words and book files
stop_words = Get_Stop_Word_List("stop-words.txt")
book = Get_Book_Word_List("mobydick.txt")

#Test the function, create a book without stop-words
book2 = Remove_Stop_Words(book,stop_words)

#Print out the results
print(book2) #print the results for viewing

#visual indication for information output
print("START TEST")

#print the sizes of the word arrays
print("Number of stop-words:", len(stop_words))
print("Number of words in book:", len(book))
print("Number of words in book with stop-words removed:", len(book2))

#Test if there are any stop-words in book2

a = 0 #words in the stop_words list
b = 0 #words not in the stop_words list

#count the words
for word in book2:
	if word in stop_words:
		a+=1
	else:
		b+=1

#print results
print("Words from book IN stop-words list:", a)
print("Words from book NOT IN stop-words list:", b)
print("END TEST")

