const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
    "https://humhaknetazvqkovlxdn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bWhha25ldGF6dnFrb3ZseGRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE5NjQ4NSwiZXhwIjoyMDc0NzcyNDg1fQ.0S7eZm_ggQdOfgle0UrvLGBQRzNHW1T2fsPzk-YLeN4"
);

async function check() {
    console.log("Fetching latest game_sessions...");
    const { data, error } = await supabase
        .from('game_sessions')
        .select('id, created_at, status, application')
        .order('created_at', { ascending: false })
        .limit(10);
        
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Latest sessions:");
        console.table(data);
    }
}
check();
