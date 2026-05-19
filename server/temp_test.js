const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://humhaknetazvqkovlxdn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bWhha25ldGF6dnFrb3ZseGRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE5NjQ4NSwiZXhwIjoyMDc0NzcyNDg1fQ.0S7eZm_ggQdOfgle0UrvLGBQRzNHW1T2fsPzk-YLeN4"
);

async function testInsert() {
    const initialData = {
        id: "01n0mx450010008e7jp0",
        quiz_id: "test_quiz_id",
        host_id: "70ec74d4-ce36-4766-ad8d-b03a11dbdd0b", // must be valid UUID perhaps?
        state_id: null,
        city_id: null,
        country_id: null,
        game_pin: "123456",
        status: "waiting",
        total_time_minutes: 5,
        question_limit: "all",
        game_end_mode: "manual",
        allow_join_after_start: false,
        participants: [],
        responses: [],
        current_questions: [],
        created_at: new Date().toISOString(),
        countdown_started_at: null,
        started_at: null,
        ended_at: null,
        application: "zigma",
        quiz_detail: {},
        difficulty: "mudah"
    };

    console.log("Upserting...");
    const { data, error } = await supabase
        .from('game_sessions')
        .upsert(initialData, { onConflict: 'id' });

    if (error) {
        console.error("ERROR:", error);
    } else {
        console.log("SUCCESS:", data);
    }
}

testInsert();
