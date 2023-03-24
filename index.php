<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        
        <header>
            
        </header>  

        <div id="left">

        </div>

        <div id="center">
            <?php
                $output = shell_exec('python pythontest.py');
                echo $output;
            ?>
        </div>

        <div id="right">
        
        </div>

        <footer>

        </footer>

    </body>
</html>