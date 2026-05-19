const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
    "https://humhaknetazvqkovlxdn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bWhha25ldGF6dnFrb3ZseGRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE5NjQ4NSwiZXhwIjoyMDc0NzcyNDg1fQ.0S7eZm_ggQdOfgle0UrvLGBQRzNHW1T2fsPzk-YLeN4"
);

async function testInsert() {
    const { data: profiles } = await supabase.from('profiles').select('id').limit(1);
    const validHostId = profiles[0].id;
    
    const { data: quizzes } = await supabase.from('quizzes').select('id').limit(1);
    const validQuizId = quizzes[0].id;

    const initialData = {
        id: "01n0mx450010008e7jp2",
        quiz_id: validQuizId,
        host_id: validHostId,
        state_id: null,
        city_id: null,
        country_id: null,
        game_pin: "999991",
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
        application: "Zigma",
        quiz_detail: {},
        difficulty: "mudah"
    };

    let res = await supabase.from('game_sessions').upsert(initialData, { onConflict: 'id' });
    console.log("Zigma result:", res.error || "SUCCESS");
}

testInsert();
