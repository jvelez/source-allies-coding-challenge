
import string
import operator

#_READ_STOP_WORD_FILE_=============================================================================#
# Read a given stop-word textfile and return a string array with the stop-words.
#==================================================================================================#
def Get_Stop_Word_List(file_name):
	file = open(file_name,encoding='utf-8') #open the given file
	words = file.read().lower().split("#")[-1].split() #split the file into an array of strings
    file.close(); #close the file
	return list(set(words)) #remove duplicate elements and return list
#==================================================================================================#


#_READ_BOOK_FILE_==================================================================================#
# Read a given book textfile and return a string array with the all words in the book.
# This excludes the header and footer sengments of the file. It will only work for text files 
# with the following format [header *** header2 *** content *** footer... ].
# edit: 
# 	lines = lines.translate(str.maketrans('', '', string.punctuation+"—“”")) works but is best to
#	just exclude everything exept letters to avoid encountering any special case. 
#==================================================================================================#
def Get_Book_Word_List(file_name):
	file = open(file_name,encoding='utf-8') #open the given file
	lines = file.read().split('***')[2].lower() # get element [2] the content of the book
	#remove punctuation marks
	lines2 = ""
	for i in lines:
		#Only include letters and if anything is not a letter replace it with whitespace.
		#Remove "-’" to prevent hyphenated compound words, and abreviated words.
		#Add +"0123456789" to include words like 1st, dates, years, or chapter numbers.
		if i in "abcdefghijklmnopqrstuvwxyz’-":
			lines2+=i
		else:
			lines2+=" "
	lines2 = lines2.split() #split into an array of strings and return list
    file.close(); #close the file
	return [word for word in lines2 if word != "’"] #remove lone "’" elements and return the list
#==================================================================================================#


#_REMOVE_STOP_WORDS_===============================================================================#
# Given a content word list and a stop word list, remove the stop words from the content list.
#==================================================================================================#
def Remove_Stop_Words(content, stop_words):
	words = [w for w in content if w not in stop_words] #create a new list without the stop-words
	return words # return word list
#==================================================================================================#


#_PERFORM_WORD_COUNT===============================================================================#
# Given a content word list, counts the ocurrences of each word and returns list of tupples 
# that contain (word, number_of_ocurrences), and is sorted by the number_of_ocurrences.
#==================================================================================================#
def Perform_Word_Count(content):
	ocurrences = {}
	for word in content:
		if word not in ocurrences: #if this is a new key in the dict
			ocurrences[word]=1      #set its value to 1
		else:
			ocurrences[word]+=1     #otherwise add 1 to the counter
	return sorted(ocurrences.items(), key=operator.itemgetter(1), reverse=True) #turn dict into sorted list and return
#==================================================================================================#


#Load the stop-words and book files
stop_words = Get_Stop_Word_List("stop-words.txt")
book = Get_Book_Word_List("mobydick.txt")

#Test the function, create a book without stop-words
book2 = Remove_Stop_Words(book,stop_words)

#visual indication for information output
print("START TEST")

#Test the word count function
word_count = Perform_Word_Count(book2)

#Print the results
for pair in word_count:
	print(pair[0], pair[1])

#visual indication for end of output
print("END TEST")