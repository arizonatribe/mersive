# Project Description

You’ve been tasked with creating a feature to help clients manage firmware updates for their organization’s devices.

To accomplish this, we’ve created a sortable table component. We’d like to populate this table with device and update data from the database.

To start the server, run `npm run serve` from the project root. Currently, this serves a basic GraphQL endpoint with the device names. You may use the included RESTful example instead, or another strategy if you prefer.

This server has access to a sqlite3 database with all the necessary data, seeded by the queries in the `sql` folder. Create additional functions or views as needed, but do not modify the existing schema or data.

To view the client in a browser, run `npm run start` from the root. When you're finished, this client should consume data from the local server and implement sorting and pagination.

Feel free to make any changes to the existing code and include new modules as needed, but keep best practices and future scalability in mind.

The table has the following columns:

#### Status (Unlabeled)

Our existing firmware versions can be found in the database. Devices that are on the latest version will have a green checkmark in this column.

Devices with an in-progress update will display a loading icon. Updates are in-progress if no “finished” value is present in the database.

For other devices, this column can be blank.

When sorted in ascending order, checkmarks should come first, followed by loading icons, then empty rows.

#### User

This column displays the email address of the device’s user.

If the device’s user cannot perform updates, this column will also include a warning icon. Users can perform updates if they have an “update” permission or if they are an admin.

#### Firmware

This column displays the device’s current version, formatted like “1.2.3”.

When sorted, 10.1.1 should be higher than 9.1.1.

(See https://semver.org/ for more explanation of this convention.)

#### Last Updated

This column’s value is based on the most recent “finished” time for a completed update.

For updates completed within the past day, this can be formatted as “X Hour(s) Ago”. Otherwise just display the date, i.e. ”YYYY/MM/DD”.

**Note: This table should not include devices of users whose subscription end dates have passed.**
