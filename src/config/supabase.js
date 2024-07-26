const {createClient } = require('@supabase/supabase-js');

// Supabase integration code
const supabaseUrl ='https://gqxphzsnzqsfsjotvlbz.supabase.co'; //process.env.SUPABASE_URL;
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxeHBoenNuenFzZnNqb3R2bGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMTc3MDMsImV4cCI6MjAzNDc5MzcwM30.yuZXkQkVCv0UrXE8hS6aK0GNP60mj4qOyR_waZpAeWk"; //process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase.auth.admin)
module.exports = supabase;

