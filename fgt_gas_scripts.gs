/*
 * -----------------------------------------------------------------------------------
 *   REVERSEBYDELIMITER function for GAS(GoogleAppsScript)
 * -----------------------------------------------------------------------------------
 *   If input_string param not a string funtion will return NULL
 *   If str_delimiter param is null or space or length not in 1, 
 *     function set param to default value = ";" (std delimiter for this function)
 *
 *   Example: 
 *   Text in cell A1
 *   "Maria A\r\n
 *   Anastasya P\r\n
 *   Andrey B;17/May/18 11:04 AM;sergei;2220"
 *
 *   Reverse Text in cell A2 with function =REVERSEBYDELIMITER(A1, ";") look like as
 *   "2220;sergei;17/May/18 11:04 AM;Maria A\r\n
 *   Anastasya P\r\n
 *   Andrey B"


 
 
 * -----------------------------------------------------------------------------------
 */
function REVERSEBYDELIMITER(input_string, str_delimiter) {
  if (typeof input_string != 'string') {
    return null;
  }
  var str_delimiter = ( str_delimiter == null || str_delimiter.length != 1 || str_delimiter == " " ) ? ";" : str_delimiter;
  return input_string.split(str_delimiter).reverse().join(str_delimiter);
}

/*
 * --------------------------------------------------------
 *   MD5 function for GAS(GoogleAppsScript)
 * --------------------------------------------------------
 * Usage1:
 *   `=MD5("YourStringToHash")`
 *     or
 *   `=MD5( A1 )` with the same string at A1 cell
 *   result:
 *     `FCE7453B7462D9DE0C56AFCCFB756193`.
 *     For your sure-ness you can verify it in your terminal as below.
 *     `$ md5 -s "YourStringToHash"`
 * Usage2:
 *   `=MD5("YourStringToHash", true)` for short Hash
 *    result:
 *     `6MQH`
 *     Note that it has more conflict probability.
 * ------------------------------------------
 *
 * @param {string} input The value to hash.
 * @param {boolean} isShortMode Set true for 4 digit shortend hash, else returns usual MD5 hash.
 * @return {string} The hashed input
 * @customfunction
 *
 */
function MD5( input, isShortMode )
{
    var txtHash = '';
    var rawHash = Utilities.computeDigest(
                      Utilities.DigestAlgorithm.MD5,
                      input,
                      Utilities.Charset.UTF_8 );

    var isShortMode = ( isShortMode == true ) ? true : false;
 
    if ( ! isShortMode ) {
        for ( i = 0; i < rawHash.length; i++ ) {

            var hashVal = rawHash[i];

            if ( hashVal < 0 ) {
                hashVal += 256;
            };
            if ( hashVal.toString( 16 ).length == 1 ) {
                txtHash += '0';
            };
            txtHash += hashVal.toString( 16 );
        };
    } else {
        for ( j = 0; j < 16; j += 8 ) {

            hashVal = ( rawHash[j]   + rawHash[j+1] + rawHash[j+2] + rawHash[j+3] )
                    ^ ( rawHash[j+4] + rawHash[j+5] + rawHash[j+6] + rawHash[j+7] );

            if ( hashVal < 0 ) {
                hashVal += 1024;
            };
            if ( hashVal.toString( 36 ).length == 1 ) {
                txtHash += "0";
            };

            txtHash += hashVal.toString( 36 );
        };
    };

    // change below to "txtHash.toLowerCase()" for lower case result.
    return txtHash.toUpperCase();

}
