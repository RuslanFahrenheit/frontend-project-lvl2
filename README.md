# Gendif Hexlet Project

[![CI](https://github.com/RuslanFahrenheit/frontend-project-lvl2/workflows/CI/badge.svg)](https://github.com/RuslanFahrenheit/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/edf652b329e63d817042/maintainability)](https://codeclimate.com/github/RuslanFahrenheit/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/edf652b329e63d817042/test_coverage)](https://codeclimate.com/github/RuslanFahrenheit/frontend-project-lvl2/test_coverage)

CLI application to get difference between two data structures. [Read more](https://ru.hexlet.io/professions/frontend/projects/46)

Application features:
- supports different input files extensions: yaml, ini, json
- generates a report in plain text, stylish and json formats

## Installation:

Install dependencies:  
``make install``

Create package:  
``make publish``

Create a symlink in the global folder that links to the package where the npm link command was executed. This is to run the package locally by gendiff name:  
``npm link``

## Usage
``gendiff --format [type] <filepath1> <filepath2>``

The default format is 'stylish', so you can just call command without format type to have output in 'stylish' format:  
``gendiff <filepath1> <filepath2>``


## More examples
### Plain JSON files
[![asciicast](https://asciinema.org/a/7lSYqTtiq7OEX11ltvh3CRTlJ.svg)](https://asciinema.org/a/7lSYqTtiq7OEX11ltvh3CRTlJ)

### Plain YML files
[![asciicast](https://asciinema.org/a/ox6gTiWblQnhYjlb9ePKSty5b.svg)](https://asciinema.org/a/ox6gTiWblQnhYjlb9ePKSty5b)

### Plain INI files
[![asciicast](https://asciinema.org/a/hu74CKH4npYAMdGrjvDxdndQu.svg)](https://asciinema.org/a/hu74CKH4npYAMdGrjvDxdndQu)

### Nested files
[![asciicast](https://asciinema.org/a/IwbPqWbt1IIEeb58XIzlWCnTI.svg)](https://asciinema.org/a/IwbPqWbt1IIEeb58XIzlWCnTI)

### Displaying difference in plain text format
[![asciicast](https://asciinema.org/a/MciSEWEf2nXdOhfX7VCtwR3Zg.svg)](https://asciinema.org/a/MciSEWEf2nXdOhfX7VCtwR3Zg)

### Displaying difference in json format
[![asciicast](https://asciinema.org/a/RaKiWpNMATyLTB8UPyo4rtbNC.svg)](https://asciinema.org/a/RaKiWpNMATyLTB8UPyo4rtbNC)
