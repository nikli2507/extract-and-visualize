# extract-and-visualize
This web application was created within the scope of my bachelor thesis in the bachelors
degree of Computer Science at the Johannes Kepler University Linz. The application extracts courses from the course program of the Red Cross of 2023 (https://www.roteskreuz.at/fileadmin/user_upload/LV/OO/Dokumente/RK-Akademie/OOE_BP_2023-Web.pdf) and then displays them as a list. The user has the possibility to filter and search the list. The application also
displays charts representing the course data and provides a PDF upload option.

The web application can be accessed with http://extractvisualize.byethost4.com/index.html. The application 
uses a Python back-end for the course extraction. The back-end is reachable with the following URL: https://extract-visualize-back-end-p4pfvqh5nq-uc.a.run.app. The explanation of the endpoints can be found below:

* https://extract-visualize-back-end-p4pfvqh5nq-uc.a.run.app/testconn: This endpoint returns a success string to check wheter the connection to the API works or not. The actual application does not use this endpoint, it is for test purposes only.
* https://extract-visualize-back-end-p4pfvqh5nq-uc.a.run.app/courses: This enpoint returns a list of all JSON course objects of the database. The structure is the same like it is saved in the database.
* https://extract-visualize-back-end-p4pfvqh5nq-uc.a.run.app/course/(int:index) The user has to specify an integer value in the url. It returns one course of the database as JSON. The given integer serves as index for the courses list. It returns an error message if the specified index is out of bounds. The actual application does not use this endpoint, it is for test purposes only.
* https://extract-visualize-back-end-p4pfvqh5nq-uc.a.run.app/upload: A file can be uploaded with this endpoint. The content of the file is parsed and the courses are extracted and written to the database. If the file is not a PDF file or no courses could not be extracted then the endpoint returns an error message, otherwise the list of extracted courses.