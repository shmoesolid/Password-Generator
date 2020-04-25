// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordInput = document.querySelector("#password");
var lengthInput = document.querySelector("#length");
var lowerCheckbox = document.querySelector("#lowercase");
var upperCheckbox = document.querySelector("#uppercase");
var numericCheckbox = document.querySelector("#numeric");
var specialCheckbox = document.querySelector("#special");

// Write password to the #password input
function writePassword()
{
  // generate our password if we can
  var password = generatePassword();

  // nothing checked, we need at least one
  // give response and return
  if (password === false)
  {
    passwordInput.value = "ERROR: You need to have at least one type checked";
    return;
  }

  // set our password to the text area
  document.querySelector("#password").value = password;
}

// generates our password
function generatePassword()
{
  // prime some empty vars
  var rtnString = "";
  var arrayStrings = [];

  // establish what we have checked and add to available strings to use
  if (lowerCheckbox.checked) arrayStrings.push("abcdefghijklmnopqrstuvwxyz"); // add lower
  if (upperCheckbox.checked) arrayStrings.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ"); // add upper
  if (numericCheckbox.checked) arrayStrings.push("0123456789"); // add numeric
  if (specialCheckbox.checked) arrayStrings.push("!@#$%^&*"); // add special

  // return if nothing checked
  if (arrayStrings.length == 0)
    return false;

  // attempt to parse length input into an integer
  var length = parseInt(lengthInput.value);

  // confirm length input's value is a number
  // set it to default if not
  if (typeof length != 'number')
    length = lengthInput.value = 16;
  
  // we have a number, make sure its contained, this forces the
  // number to the closest possible value if it is out of bounds
  else 
    length = lengthInput.value = _containNum( length, 8, 128 );

  // loop through our length and make our password step by step
  for (var x=0; x < length; x++)
  {
    // get a random type of what is available/checked
    var typeString = arrayStrings[ _randomInt( arrayStrings.length ) ];

    // get a random char index using the length of the string
    var randomCharIndex = _randomInt( typeString.length );

    // add to our return string with the proper random char
    rtnString += typeString.charAt( randomCharIndex );
  }
  
  // return our password
  return rtnString;
}

// gets random integer from 0 to 1 less than specified num
function _randomInt(num)
{
  return Math.floor( Math.random() * num );
}

// forces an number to be contained in a range
function _containNum(num, min, max)
{
  return Math.max( Math.min(num, max), min );
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
