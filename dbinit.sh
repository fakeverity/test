psql -U postgres  -c "CREATE ROLE test_user WITH CREATEDB CREATEROLE LOGIN"
psql -U postgres  -c "CREATE DATABASE test_user"
psql -U test_user -c "CREATE DATABASE testdb OWNER=test_user"
psql -U test_user -d "testdb" -c "GRANT ALL PRIVILEGES ON DATABASE \"testdb\" to test_user"
psql -U test_user -d "testdb" -f ./create_tables.sql
