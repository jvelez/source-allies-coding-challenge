
#_READ_STOP_WORD_FILE_=============================================================================#
# Read a given stop-word textfile and return a string array with the stop-words.
#==================================================================================================#
def Get_Stop_Word_List(file_name):
	file = open(file_name,encoding='utf-8') #open the given file
	lines = file.read().split('\n\n') #split the file into an array of strings
	return list(set(lines[lines.index("a"):])) #remove unnecesary elements and return list
#==================================================================================================#

#Test the function by printing out the resulting list.
print(Get_Stop_Word_List("stop-words.txt"))
