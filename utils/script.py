import os
import re

# Define the directory to search as the current directory
directory_to_search = os.getcwd()

# Regular expression to match the import statement
import_regex = re.compile(r'import\s+\{\s*ReactComponent\s+as\s+(\w+)\s*\}\s+from\s+([\'"])(.*?)\2\s*;?')

def process_file(file_path):
    """Process a single file to replace the import statement."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Replace the matching import statements
    new_content = import_regex.sub(r'import \1 from \2\3\2;', content)

    # Write the changes back to the file if any changes were made
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f'Updated: {file_path}')

def traverse_directory(directory):
    """Recursively traverse the directory and process files."""
    for root, dirs, files in os.walk(directory):
        # Ignore the node_modules directory
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        
        for file in files:
            if file.endswith('.js') or file.endswith('.jsx'):  # Process only JavaScript files
                file_path = os.path.join(root, file)
                process_file(file_path)

if __name__ == '__main__':
    traverse_directory(directory_to_search)
