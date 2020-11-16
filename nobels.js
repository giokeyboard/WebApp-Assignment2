/* the following line is intended to avoid code-checking errors in Brackets, retrieved at https://stackoverflow.com/questions/46841788/document-is-not-defined-javascript-error */
/*eslint-env browser*/

// load and parse the JSON file - code retrieved from class practicals and adapted
var xmlhttp = new XMLHttpRequest();
var url = "nobelWinners.json";
xmlhttp.onreadystatechange = function () {
    "use strict";
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //Parse the JSON data to a JavaScript variable. 
        var parsedObj = JSON.parse(xmlhttp.responseText);
            // This function is defined below and deals with the JSON data parsed from the file. 
        displayJSON(parsedObj);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

// set the environment to display JSON
function displayJSON(obj) {
    "use strict";
    // country code parsing (iso country codes and names found at https://gist.github.com/maephisto/9228207, subsequently adapted)
    var k = 0,
        l = 0,
        m = 0,
        nobelCountryCodes = [undefined],
        isoCountries = [
            {'ccode' : 'AF', 'cname' : 'Afghanistan'},
            {'ccode' : 'AX', 'cname' : 'Aland Islands'},
            {'ccode' : 'AL', 'cname' : 'Albania'},
            {'ccode' : 'DZ', 'cname' : 'Algeria'},
            {'ccode' : 'AS', 'cname' : 'American Samoa'},
            {'ccode' : 'AD', 'cname' : 'Andorra'},
            {'ccode' : 'AO', 'cname' : 'Angola'},
            {'ccode' : 'AI', 'cname' : 'Anguilla'},
            {'ccode' : 'AQ', 'cname' : 'Antarctica'},
            {'ccode' : 'AG', 'cname' : 'Antigua And Barbuda'},
            {'ccode' : 'AR', 'cname' : 'Argentina'},
            {'ccode' : 'AM', 'cname' : 'Armenia'},
            {'ccode' : 'AW', 'cname' : 'Aruba'},
            {'ccode' : 'AU', 'cname' : 'Australia'},
            {'ccode' : 'AT', 'cname' : 'Austria'},
            {'ccode' : 'AZ', 'cname' : 'Azerbaijan'},
            {'ccode' : 'BS', 'cname' : 'Bahamas'},
            {'ccode' : 'BH', 'cname' : 'Bahrain'},
            {'ccode' : 'BD', 'cname' : 'Bangladesh'},
            {'ccode' : 'BB', 'cname' : 'Barbados'},
            {'ccode' : 'BY', 'cname' : 'Belarus'},
            {'ccode' : 'BE', 'cname' : 'Belgium'},
            {'ccode' : 'BZ', 'cname' : 'Belize'},
            {'ccode' : 'BJ', 'cname' : 'Benin'},
            {'ccode' : 'BM', 'cname' : 'Bermuda'},
            {'ccode' : 'BT', 'cname' : 'Bhutan'},
            {'ccode' : 'BO', 'cname' : 'Bolivia'},
            {'ccode' : 'BA', 'cname' : 'Bosnia And Herzegovina'},
            {'ccode' : 'BW', 'cname' : 'Botswana'},
            {'ccode' : 'BV', 'cname' : 'Bouvet Island'},
            {'ccode' : 'BR', 'cname' : 'Brazil'},
            {'ccode' : 'IO', 'cname' : 'British Indian Ocean Territory'},
            {'ccode' : 'BN', 'cname' : 'Brunei Darussalam'},
            {'ccode' : 'BG', 'cname' : 'Bulgaria'},
            {'ccode' : 'BF', 'cname' : 'Burkina Faso'},
            {'ccode' : 'BI', 'cname' : 'Burundi'},
            {'ccode' : 'KH', 'cname' : 'Cambodia'},
            {'ccode' : 'CM', 'cname' : 'Cameroon'},
            {'ccode' : 'CA', 'cname' : 'Canada'},
            {'ccode' : 'CV', 'cname' : 'Cape Verde'},
            {'ccode' : 'KY', 'cname' : 'Cayman Islands'},
            {'ccode' : 'CF', 'cname' : 'Central African Republic'},
            {'ccode' : 'TD', 'cname' : 'Chad'},
            {'ccode' : 'CL', 'cname' : 'Chile'},
            {'ccode' : 'CN', 'cname' : 'China'},
            {'ccode' : 'CX', 'cname' : 'Christmas Island'},
            {'ccode' : 'CC', 'cname' : 'Cocos (Keeling) Islands'},
            {'ccode' : 'CO', 'cname' : 'Colombia'},
            {'ccode' : 'KM', 'cname' : 'Comoros'},
            {'ccode' : 'CG', 'cname' : 'Congo'},
            {'ccode' : 'CD', 'cname' : 'Congo, Democratic Republic'},
            {'ccode' : 'CK', 'cname' : 'Cook Islands'},
            {'ccode' : 'CR', 'cname' : 'Costa Rica'},
            {'ccode' : 'CI', 'cname' : 'Cote D\'Ivoire'},
            {'ccode' : 'HR', 'cname' : 'Croatia'},
            {'ccode' : 'CU', 'cname' : 'Cuba'},
            {'ccode' : 'CY', 'cname' : 'Cyprus'},
            {'ccode' : 'CZ', 'cname' : 'Czech Republic'},
            {'ccode' : 'DK', 'cname' : 'Denmark'},
            {'ccode' : 'DJ', 'cname' : 'Djibouti'},
            {'ccode' : 'DM', 'cname' : 'Dominica'},
            {'ccode' : 'DO', 'cname' : 'Dominican Republic'},
            {'ccode' : 'EC', 'cname' : 'Ecuador'},
            {'ccode' : 'EG', 'cname' : 'Egypt'},
            {'ccode' : 'SV', 'cname' : 'El Salvador'},
            {'ccode' : 'GQ', 'cname' : 'Equatorial Guinea'},
            {'ccode' : 'ER', 'cname' : 'Eritrea'},
            {'ccode' : 'EE', 'cname' : 'Estonia'},
            {'ccode' : 'ET', 'cname' : 'Ethiopia'},
            {'ccode' : 'FK', 'cname' : 'Falkland Islands (Malvinas)'},
            {'ccode' : 'FO', 'cname' : 'Faroe Islands'},
            {'ccode' : 'FJ', 'cname' : 'Fiji'},
            {'ccode' : 'FI', 'cname' : 'Finland'},
            {'ccode' : 'FR', 'cname' : 'France'},
            {'ccode' : 'GF', 'cname' : 'French Guiana'},
            {'ccode' : 'PF', 'cname' : 'French Polynesia'},
            {'ccode' : 'TF', 'cname' : 'French Southern Territories'},
            {'ccode' : 'GA', 'cname' : 'Gabon'},
            {'ccode' : 'GM', 'cname' : 'Gambia'},
            {'ccode' : 'GE', 'cname' : 'Georgia'},
            {'ccode' : 'DE', 'cname' : 'Germany'},
            {'ccode' : 'GH', 'cname' : 'Ghana'},
            {'ccode' : 'GI', 'cname' : 'Gibraltar'},
            {'ccode' : 'GR', 'cname' : 'Greece'},
            {'ccode' : 'GL', 'cname' : 'Greenland'},
            {'ccode' : 'GD', 'cname' : 'Grenada'},
            {'ccode' : 'GP', 'cname' : 'Guadeloupe'},
            {'ccode' : 'GU', 'cname' : 'Guam'},
            {'ccode' : 'GT', 'cname' : 'Guatemala'},
            {'ccode' : 'GG', 'cname' : 'Guernsey'},
            {'ccode' : 'GN', 'cname' : 'Guinea'},
            {'ccode' : 'GW', 'cname' : 'Guinea-Bissau'},
            {'ccode' : 'GY', 'cname' : 'Guyana'},
            {'ccode' : 'HT', 'cname' : 'Haiti'},
            {'ccode' : 'HM', 'cname' : 'Heard Island & Mcdonald Islands'},
            {'ccode' : 'VA', 'cname' : 'Holy See (Vatican City State)'},
            {'ccode' : 'HN', 'cname' : 'Honduras'},
            {'ccode' : 'HK', 'cname' : 'Hong Kong'},
            {'ccode' : 'HU', 'cname' : 'Hungary'},
            {'ccode' : 'IS', 'cname' : 'Iceland'},
            {'ccode' : 'IN', 'cname' : 'India'},
            {'ccode' : 'ID', 'cname' : 'Indonesia'},
            {'ccode' : 'IR', 'cname' : 'Iran, Islamic Republic Of'},
            {'ccode' : 'IQ', 'cname' : 'Iraq'},
            {'ccode' : 'IE', 'cname' : 'Ireland'},
            {'ccode' : 'IM', 'cname' : 'Isle Of Man'},
            {'ccode' : 'IL', 'cname' : 'Israel'},
            {'ccode' : 'IT', 'cname' : 'Italy'},
            {'ccode' : 'JM', 'cname' : 'Jamaica'},
            {'ccode' : 'JP', 'cname' : 'Japan'},
            {'ccode' : 'JE', 'cname' : 'Jersey'},
            {'ccode' : 'JO', 'cname' : 'Jordan'},
            {'ccode' : 'KZ', 'cname' : 'Kazakhstan'},
            {'ccode' : 'KE', 'cname' : 'Kenya'},
            {'ccode' : 'KI', 'cname' : 'Kiribati'},
            {'ccode' : 'KR', 'cname' : 'Korea'},
            {'ccode' : 'KW', 'cname' : 'Kuwait'},
            {'ccode' : 'KG', 'cname' : 'Kyrgyzstan'},
            {'ccode' : 'LA', 'cname' : 'Lao People\'s Democratic Republic'},
            {'ccode' : 'LV', 'cname' : 'Latvia'},
            {'ccode' : 'LB', 'cname' : 'Lebanon'},
            {'ccode' : 'LS', 'cname' : 'Lesotho'},
            {'ccode' : 'LR', 'cname' : 'Liberia'},
            {'ccode' : 'LY', 'cname' : 'Libyan Arab Jamahiriya'},
            {'ccode' : 'LI', 'cname' : 'Liechtenstein'},
            {'ccode' : 'LT', 'cname' : 'Lithuania'},
            {'ccode' : 'LU', 'cname' : 'Luxembourg'},
            {'ccode' : 'MO', 'cname' : 'Macao'},
            {'ccode' : 'MK', 'cname' : 'Macedonia'},
            {'ccode' : 'MG', 'cname' : 'Madagascar'},
            {'ccode' : 'MW', 'cname' : 'Malawi'},
            {'ccode' : 'MY', 'cname' : 'Malaysia'},
            {'ccode' : 'MV', 'cname' : 'Maldives'},
            {'ccode' : 'ML', 'cname' : 'Mali'},
            {'ccode' : 'MT', 'cname' : 'Malta'},
            {'ccode' : 'MH', 'cname' : 'Marshall Islands'},
            {'ccode' : 'MQ', 'cname' : 'Martinique'},
            {'ccode' : 'MR', 'cname' : 'Mauritania'},
            {'ccode' : 'MU', 'cname' : 'Mauritius'},
            {'ccode' : 'YT', 'cname' : 'Mayotte'},
            {'ccode' : 'MX', 'cname' : 'Mexico'},
            {'ccode' : 'FM', 'cname' : 'Micronesia, Federated States Of'},
            {'ccode' : 'MD', 'cname' : 'Moldova'},
            {'ccode' : 'MC', 'cname' : 'Monaco'},
            {'ccode' : 'MN', 'cname' : 'Mongolia'},
            {'ccode' : 'ME', 'cname' : 'Montenegro'},
            {'ccode' : 'MS', 'cname' : 'Montserrat'},
            {'ccode' : 'MA', 'cname' : 'Morocco'},
            {'ccode' : 'MZ', 'cname' : 'Mozambique'},
            {'ccode' : 'MM', 'cname' : 'Myanmar'},
            {'ccode' : 'NA', 'cname' : 'Namibia'},
            {'ccode' : 'NR', 'cname' : 'Nauru'},
            {'ccode' : 'NP', 'cname' : 'Nepal'},
            {'ccode' : 'NL', 'cname' : 'Netherlands'},
            {'ccode' : 'AN', 'cname' : 'Netherlands Antilles'},
            {'ccode' : 'NC', 'cname' : 'New Caledonia'},
            {'ccode' : 'NZ', 'cname' : 'New Zealand'},
            {'ccode' : 'NI', 'cname' : 'Nicaragua'},
            {'ccode' : 'NE', 'cname' : 'Niger'},
            {'ccode' : 'NG', 'cname' : 'Nigeria'},
            {'ccode' : 'NU', 'cname' : 'Niue'},
            {'ccode' : 'NF', 'cname' : 'Norfolk Island'},
            {'ccode' : 'MP', 'cname' : 'Northern Mariana Islands'},
            {'ccode' : 'NO', 'cname' : 'Norway'},
            {'ccode' : 'OM', 'cname' : 'Oman'},
            {'ccode' : 'PK', 'cname' : 'Pakistan'},
            {'ccode' : 'PW', 'cname' : 'Palau'},
            {'ccode' : 'PS', 'cname' : 'Palestinian Territory, Occupied'},
            {'ccode' : 'PA', 'cname' : 'Panama'},
            {'ccode' : 'PG', 'cname' : 'Papua New Guinea'},
            {'ccode' : 'PY', 'cname' : 'Paraguay'},
            {'ccode' : 'PE', 'cname' : 'Peru'},
            {'ccode' : 'PH', 'cname' : 'Philippines'},
            {'ccode' : 'PN', 'cname' : 'Pitcairn'},
            {'ccode' : 'PL', 'cname' : 'Poland'},
            {'ccode' : 'PT', 'cname' : 'Portugal'},
            {'ccode' : 'PR', 'cname' : 'Puerto Rico'},
            {'ccode' : 'QA', 'cname' : 'Qatar'},
            {'ccode' : 'RE', 'cname' : 'Reunion'},
            {'ccode' : 'RO', 'cname' : 'Romania'},
            {'ccode' : 'RU', 'cname' : 'Russian Federation'},
            {'ccode' : 'RW', 'cname' : 'Rwanda'},
            {'ccode' : 'BL', 'cname' : 'Saint Barthelemy'},
            {'ccode' : 'SH', 'cname' : 'Saint Helena'},
            {'ccode' : 'KN', 'cname' : 'Saint Kitts And Nevis'},
            {'ccode' : 'LC', 'cname' : 'Saint Lucia'},
            {'ccode' : 'MF', 'cname' : 'Saint Martin'},
            {'ccode' : 'PM', 'cname' : 'Saint Pierre And Miquelon'},
            {'ccode' : 'VC', 'cname' : 'Saint Vincent And Grenadines'},
            {'ccode' : 'WS', 'cname' : 'Samoa'},
            {'ccode' : 'SM', 'cname' : 'San Marino'},
            {'ccode' : 'ST', 'cname' : 'Sao Tome And Principe'},
            {'ccode' : 'SA', 'cname' : 'Saudi Arabia'},
            {'ccode' : 'SN', 'cname' : 'Senegal'},
            {'ccode' : 'RS', 'cname' : 'Serbia'},
            {'ccode' : 'SC', 'cname' : 'Seychelles'},
            {'ccode' : 'SL', 'cname' : 'Sierra Leone'},
            {'ccode' : 'SG', 'cname' : 'Singapore'},
            {'ccode' : 'SK', 'cname' : 'Slovakia'},
            {'ccode' : 'SI', 'cname' : 'Slovenia'},
            {'ccode' : 'SB', 'cname' : 'Solomon Islands'},
            {'ccode' : 'SO', 'cname' : 'Somalia'},
            {'ccode' : 'ZA', 'cname' : 'South Africa'},
            {'ccode' : 'GS', 'cname' : 'South Georgia And Sandwich Isl.'},
            {'ccode' : 'ES', 'cname' : 'Spain'},
            {'ccode' : 'LK', 'cname' : 'Sri Lanka'},
            {'ccode' : 'SD', 'cname' : 'Sudan'},
            {'ccode' : 'SR', 'cname' : 'Suriname'},
            {'ccode' : 'SJ', 'cname' : 'Svalbard And Jan Mayen'},
            {'ccode' : 'SZ', 'cname' : 'Swaziland'},
            {'ccode' : 'SE', 'cname' : 'Sweden'},
            {'ccode' : 'CH', 'cname' : 'Switzerland'},
            {'ccode' : 'SY', 'cname' : 'Syrian Arab Republic'},
            {'ccode' : 'TW', 'cname' : 'Taiwan'},
            {'ccode' : 'TJ', 'cname' : 'Tajikistan'},
            {'ccode' : 'TZ', 'cname' : 'Tanzania'},
            {'ccode' : 'TH', 'cname' : 'Thailand'},
            {'ccode' : 'TL', 'cname' : 'Timor-Leste'},
            {'ccode' : 'TG', 'cname' : 'Togo'},
            {'ccode' : 'TK', 'cname' : 'Tokelau'},
            {'ccode' : 'TO', 'cname' : 'Tonga'},
            {'ccode' : 'TT', 'cname' : 'Trinidad And Tobago'},
            {'ccode' : 'TN', 'cname' : 'Tunisia'},
            {'ccode' : 'TR', 'cname' : 'Turkey'},
            {'ccode' : 'TM', 'cname' : 'Turkmenistan'},
            {'ccode' : 'TC', 'cname' : 'Turks And Caicos Islands'},
            {'ccode' : 'TV', 'cname' : 'Tuvalu'},
            {'ccode' : 'UG', 'cname' : 'Uganda'},
            {'ccode' : 'UA', 'cname' : 'Ukraine'},
            {'ccode' : 'AE', 'cname' : 'United Arab Emirates'},
            {'ccode' : 'GB', 'cname' : 'United Kingdom'},
            {'ccode' : 'US', 'cname' : 'United States'},
            {'ccode' : 'UM', 'cname' : 'United States Outlying Islands'},
            {'ccode' : 'UY', 'cname' : 'Uruguay'},
            {'ccode' : 'UZ', 'cname' : 'Uzbekistan'},
            {'ccode' : 'VU', 'cname' : 'Vanuatu'},
            {'ccode' : 'VE', 'cname' : 'Venezuela'},
            {'ccode' : 'VN', 'cname' : 'Viet Nam'},
            {'ccode' : 'VG', 'cname' : 'Virgin Islands, British'},
            {'ccode' : 'VI', 'cname' : 'Virgin Islands, U.S.'},
            {'ccode' : 'WF', 'cname' : 'Wallis And Futuna'},
            {'ccode' : 'EH', 'cname' : 'Western Sahara'},
            {'ccode' : 'YE', 'cname' : 'Yemen'},
            {'ccode' : 'ZM', 'cname' : 'Zambia'},
            {'ccode' : 'ZW', 'cname' : 'Zimbabwe'}
        ];
    
    // loop through each nobel laureate to get a list of unique laureates' birth country codes
    for (k = 0; k < obj.laureates.length; k += 1) {
        if (!(nobelCountryCodes.includes(obj.laureates[k].bornCountryCode))) {
            nobelCountryCodes.push(obj.laureates[k].bornCountryCode);
        }
    }
    
    // send the list of unique laureates' birth countries to HTML country option showing country names instead of codes
    var countryNames = [];
    for (l = 0; l < nobelCountryCodes.length; l += 1) {
        for (m = 0; m < isoCountries.length; m += 1) {
            if (isoCountries[m].ccode == nobelCountryCodes[l]) {
                countryNames.push([isoCountries[m].cname, nobelCountryCodes[l]]);
            }
        }
    }
    countryNames.sort();
    var q;
    for (q = 0; q < countryNames.length; q += 1) {
        document.getElementById("country").innerHTML += "<option value='" + countryNames[q][1] + "'>" + countryNames[q][0] + "</option>";
    }
    
    // check if input years are valid, otherwise display error message and color input elements
    function checkYears() {
        if (document.getElementById("startyear").value > document.getElementById("endyear").value || document.getElementById("startyear").value < 1901 || document.getElementById("endyear").value > 2018) {
            document.getElementById("startyear").style.background = "red";
            document.getElementById("endyear").style.background = "red";
            document.getElementById("yerror").innerHTML = "Error. Check year range!";
        } else {
            document.getElementById("startyear").style.background = "white";
            document.getElementById("endyear").style.background = "white";
            document.getElementById("yerror").innerHTML = "";
        }
    }
    
    // show results section
    // set onclick trigger for result function, year checking function and setting default both sexes filter selection
    document.getElementById("submitButton").onclick = function () {
        displayResults();
        checkYears();
        document.getElementById("radio_both").click();
    };
    
    // event listeners to toggle radio buttons
    document.getElementById("radio_male").onclick = function () {myFunction("male"); };
    document.getElementById("radio_female").onclick = function () {myFunction("female"); };
    document.getElementById("radio_both").onclick = function () {myFunction("both"); };
    
    // define function to display results
    function displayResults() {
        var inpStartYear = document.getElementById("startyear").value,
            inpEndYear = document.getElementById("endyear").value,
            selectedCategory = document.getElementById("subject").value,
            selectedCountry = document.getElementById("country").value,
            resultsTable = "",
            i = 0,
            j = 0,
            aff = 0;
        document.getElementById("sexform").style.display = "block";
        
        // build the results table
        var extraInfo = "";
        resultsTable += "<tr><th>Name</th><th>Category</th><th>Year</th><th style='display:none;'>Sex</th></tr>";
        for (i = 0; i < obj.laureates.length; i += 1) {
            for (j = 0; j < obj.laureates[i].prizes.length; j += 1) {
                var dates_block = "",
                    motivation_block = "",
                    birthcity_block = "",
                    affiliation_block = "";
                // build HTML block with birth and death years - if relevant or present
                if (obj.laureates[i].born.slice(0, 4) != "0000" && obj.laureates[i].died.slice(0, 4) != "0000") {
                    dates_block += "(" + "*" + obj.laureates[i].born.slice(0, 4) + " - " + "&dagger;" + obj.laureates[i].died.slice(0, 4) + ")";
                } else if (obj.laureates[i].born.slice(0, 4) != "0000" && obj.laureates[i].died.slice(0, 4) == "0000") {
                    dates_block += "(" + "*" + obj.laureates[i].born.slice(0, 4) + ")";
                }
                // build HTML block with motivation if present - regexs have been used to escape special chars like ",',;
                if (obj.laureates[i].prizes[j].motivation) {
                    motivation_block += "<p>The Nobel Committee awarded the prize in " + obj.laureates[i].prizes[j].category + " for the year " + obj.laureates[i].prizes[j].year + " adducing the following motivation: " + "<i>" + obj.laureates[i].prizes[j].motivation.replace(/\'|\"/g, "\\'").replace(/\;/g, "\\;") + "</i>" + "." + "</p>";
                }
                // build HTML block with city of birth - if present
                if (obj.laureates[i].bornCity) {
                    birthcity_block += "<p>Born in: " + obj.laureates[i].bornCity.replace(/\'|\"/g, "\\'") + " - " + obj.laureates[i].bornCountry.replace(/\'|\"/g, "\\'") + "</p>";
                }
                // build HTML block with affiliations - if present
                if (obj.laureates[i].prizes[j].affiliations[0].name) {
                    affiliation_block += "<p>" + "Affiliations: " + "</p>" + "<ul>";
                }
                for (aff = 0; aff < obj.laureates[i].prizes[j].affiliations.length; aff += 1) {
                    if (obj.laureates[i].prizes[j].affiliations[aff].name) {
                        affiliation_block += "<li>";
                        affiliation_block += obj.laureates[i].prizes[j].affiliations[aff].name.replace(/\'|\"/g, "\\'");
                    }
                    if (obj.laureates[i].prizes[j].affiliations[aff].city) {
                        affiliation_block += " - " + obj.laureates[i].prizes[j].affiliations[aff].city.replace(/\'|\"/g, "\\'") + " ";
                    }
                    if (obj.laureates[i].prizes[j].affiliations[aff].country) {
                        affiliation_block += "(" + obj.laureates[i].prizes[j].affiliations[aff].country.replace(/\'|\"/g, "\\'") + ")";
                    }
                    if (obj.laureates[i].prizes[j].affiliations[aff].name) {
                        affiliation_block += "</li>";
                    }
                }
                if (obj.laureates[i].prizes[j].affiliations[0].name) {
                    affiliation_block += "</ul>";
                }
                
                // build results table complying with user-set filters
                if (obj.laureates[i].prizes[j].year >= inpStartYear && obj.laureates[i].prizes[j].year <= inpEndYear && inpStartYear >= 1901 && inpEndYear <= 2018) {
                    if (obj.laureates[i].surname == undefined) {
                        if (obj.laureates[i].prizes[j].category == selectedCategory || selectedCategory == "") {
                            if (obj.laureates[i].bornCountryCode == selectedCountry || selectedCountry == "all") {
                                extraInfo = "<h3>" + obj.laureates[i].firstname.replace(/\'|\"/g, "\\'") + " " + dates_block + "</h3>" + birthcity_block + motivation_block + affiliation_block;
                                // calling a onclick-triggered function for the button to display extra information
                                resultsTable += "<tr><td>" + obj.laureates[i].firstname + " " + "<button class='myBtn'" + "onclick=\"test" + "(" + "\'" + extraInfo + "\'" + ")" + "\">more info</button></td><td>" + obj.laureates[i].prizes[j].category + "</td><td>" + obj.laureates[i].prizes[j].year + "</td><td style='display:none;'>" + obj.laureates[i].gender + "</td></tr>";
                            }
                        }
                    } else {
                        if (obj.laureates[i].prizes[j].category == selectedCategory || selectedCategory == "") {
                            if (obj.laureates[i].bornCountryCode == selectedCountry || selectedCountry == "all") {
                                extraInfo = "<h3>" + obj.laureates[i].firstname.replace(/\'/g, "\\'") + " " + obj.laureates[i].surname.replace(/\'|\"/g, "\\'") + " " + dates_block + "</h3>" + birthcity_block + motivation_block + affiliation_block;
                                // calling a onclick-triggered function for the button to display extra information
                                resultsTable += "<tr><td>" + obj.laureates[i].surname.toUpperCase() + ", " + obj.laureates[i].firstname + " " + "<button class='myBtn'" + "onclick=\"test" + "(" + "\'" + extraInfo + "\'" + ")" + "\">more info</button></td><td>" + obj.laureates[i].prizes[j].category + "</td><td>" + obj.laureates[i].prizes[j].year + "</td><td style='display:none;'>" + obj.laureates[i].gender + "</td></tr>";
                            }
                        }
                    }
                }
            }
        }
        document.getElementById("outcome").innerHTML = resultsTable;
    }
    
    // filter by sex
    function myFunction(arg) {
        var table_sex, tr_sex, td_sex, s, t,
            counter = 0;
        document.getElementById("emptyresult").innerHTML = "";
        table_sex = document.getElementById("outcome");
        tr_sex = table_sex.getElementsByTagName("tr");
        for (s = 0; s < tr_sex.length; s += 1) {
            td_sex = tr_sex[s].getElementsByTagName("td")[3];
            if (td_sex) {
                if (td_sex.innerHTML == arg) {
                    tr_sex[s].style.display = "";
                } else if (arg == "both") {
                    tr_sex[s].style.display = "";
                } else {
                    tr_sex[s].style.display = "none";
                }
            }
        }
        
        // check if no data is showing; in that case show error message
        for (t = 1; t < table_sex.rows.length; t += 1) {
            if (table_sex.rows[t].offsetWidth > 0 && table_sex.rows[t].offsetHeight > 0) {
                counter += 1;
            }
        }
        if (counter == 0) {document.getElementById("emptyresult").innerHTML += "~ ~ No data matches your selection. Try again! ~ ~";
            }
    }
}

// modal JavaScript section, code retrieved at https://www.w3schools.com/howto/howto_css_modals.asp
// get the modal
var modal = document.getElementById('myModal');
// get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];  
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// display the modal passing extra information as defined above as the actual function parameter
function test(arg) {
    document.getElementById("moreinfo").innerHTML = arg;
    modal.style.display = "block";
}