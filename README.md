# homeLike
### STEPS TO INSTALL:
1. Start the MongoDB Server:
   - Go to <mongodb-install-directory>/bin directory
   - Run the command:
     ./mongod
   - Create a Database named "assignment":
     use assignment
2. Start the server in the `../server` folder
   - npm start
3. start the client:
    - npm i
    - npm start

## What to do
1. Invest some time to refactor the current code and make it better
    - please also tell us what you did
1. Add webpack
1. Add information about owner to apartment view page
1. Add new page "Locations", show the apartments filtered by location
1. Add new page "search page", provide abilities to search by location and filter by [size, price, amenities, details, services]

## Development Status
1.Steps taken to Refactor the code:
  - Changed the entire folder structure of the project, grouped all the actions , reducers inside store folder, all the css files are moved to stylesheets folder, moved all the reusable stateless components into the "components" folder.
  - All the constants are moved into one single file.
  - Fixed all the LINT errors
2.When the apartments were fetched locations were always returned as null by the BE query provided, so it had to be changed.
3.Added Webpack.
4.url for Locations page is `/locations`, and for Search page is `/search`
