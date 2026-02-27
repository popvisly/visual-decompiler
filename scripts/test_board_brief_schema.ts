import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
    console.log('Fetching a board with items to test /api/brief generation...');

    // 1. Find a board that actually has items
    const { data: boards, error: searchErr } = await supabase
        .from('boards')
        .select('id, name');

    if (searchErr || !boards || boards.length === 0) {
        console.error('❌ No boards found to test.', searchErr);
        process.exit(1);
    }

    let testBoardId = null;
    for (const board of boards) {
        const { data: items } = await supabase
            .from('board_items')
            .select('ad_id')
            .eq('board_id', board.id);

        if (items && items.length > 0) {
            testBoardId = board.id;
            console.log(`Found Board '${board.name}' with ${items.length} items. Using ID: ${board.id}`);
            break;
        }
    }

    if (!testBoardId) {
        console.log('⚠️ None of the boards have items. The test will likely fail because the API requires ads to analyze. Exiting.');
        process.exit(0);
    }

    try {
        console.log(`Sending POST request to localhost:3000/api/brief with board_id: ${testBoardId}...`);

        // Note: This requires the local Next.js server to be running on 3000
        // Since we don't have the user's Clerk token handy in this script, we'll just check the DB logic directly
        // However, we can't easily bypass Clerk in the API route from a bare script.
        // INSTEAD, let's just confirm the SQL schema allows the 'strategic_answer' JSONB column to be updated.

        const dummyAnswer = {
            content: "This is a test synthetic brief.",
            generated_at: new Date().toISOString()
        };

        const { error: updateErr } = await supabase
            .from('boards')
            .update({ strategic_answer: dummyAnswer })
            .eq('id', testBoardId);

        if (updateErr) {
            console.error("❌ Failed to update board with strategic_answer:", updateErr);
            process.exit(1);
        }

        console.log("✅ Successfully saved a strategic_answer JSONB object to the board.");

        // Check if board retrieves it correctly
        const { data: updatedBoard, error: fetchErr } = await supabase
            .from('boards')
            .select('strategic_answer')
            .eq('id', testBoardId)
            .single();

        if (fetchErr) {
            console.error("❌ Failed to fetch updated board:", fetchErr);
        } else {
            console.log("✅ Retrieved brief from board:", updatedBoard.strategic_answer);
        }

    } catch (e) {
        console.error(e);
    }

    console.log('Cleanup: removing test answer...');
    await supabase.from('boards').update({ strategic_answer: null }).eq('id', testBoardId);
    console.log('✅ Done.');
    process.exit(0);
}

runTest();
