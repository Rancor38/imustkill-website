import { createClient } from "@supabase/supabase-js"

// Environment variables will be used for production
// Local development will use fallback values for testing
const supabaseUrl =
    process.env.REACT_APP_SUPABASE_URL ||
    "https://your-supabase-url.supabase.co"
const supabaseAnonKey =
    process.env.REACT_APP_SUPABASE_ANON_KEY || "your-anon-key"

// Add debugging logs
console.log("Supabase URL:", supabaseUrl)
console.log("Supabase Key exists:", !!supabaseAnonKey)
console.log(
    "Supabase Key length:",
    supabaseAnonKey ? supabaseAnonKey.length : 0
)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Create a new initiative sharing session
 * @param {Object} data - Initial initiative data
 * @param {number} [expiresIn=null] - Optional: Time in minutes after which the session expires
 * @returns {Promise<string>} - The session ID
 */
export const createInitiativeSession = async (data, expiresIn = null) => {
    try {
        console.log("Creating initiative session with data:", data)
        console.log("Expiration minutes:", expiresIn)
        console.log("Using Supabase URL:", supabaseUrl)

        // Generate a session ID based on timestamp and random string for uniqueness
        const sessionId =
            Date.now().toString(36) + Math.random().toString(36).substring(2, 7)
        console.log("Generated session ID:", sessionId)

        // Calculate expiry time if provided
        let expiresAt = null
        if (expiresIn) {
            expiresAt = new Date()
            expiresAt.setMinutes(expiresAt.getMinutes() + expiresIn)
            console.log("Session will expire at:", expiresAt)
        }

        // Insert the data with the session ID
        console.log("Attempting to insert data to initiative_sessions table...")

        // Let's simplify our payload to just the essential fields and let Supabase handle timestamps
        const payload = {
            id: sessionId,
            combat_state: data,
        }

        // Only add expires_at if it's provided
        if (expiresAt) {
            payload.expires_at = expiresAt
        }

        console.log("Insert payload:", payload)

        // Log supabase instance to verify it's initialized correctly
        console.log("Supabase client initialized:", !!supabase)

        const { data: returnedData, error } = await supabase
            .from("initiative_sessions")
            .insert([payload])
            .select()
        if (returnedData) {
            console.log("Insert succeeded, returned data:", returnedData)
        }

        if (error) {
            console.error("Supabase insert error:", error)
            console.error("Error code:", error.code)
            console.error("Error message:", error.message)
            console.error("Error details:", error.details)
            throw error
        }
        return sessionId
    } catch (error) {
        console.error("Error creating initiative session:", error)
        throw error
    }
}

/**
 * Update an existing initiative sharing session
 * @param {string} sessionId - The session ID to update
 * @param {Object} data - Updated initiative data
 */
export const updateInitiativeSession = async (sessionId, data) => {
    try {
        // Just update the combat state and let Supabase handle timestamps
        const { error } = await supabase
            .from("initiative_sessions")
            .update({
                combat_state: data,
            })
            .eq("id", sessionId)

        if (error) throw error
    } catch (error) {
        console.error("Error updating initiative session:", error)
        throw error
    }
}

/**
 * Get the current state of an initiative session
 * @param {string} sessionId - The session ID to retrieve
 * @returns {Promise<Object>} - The session data
 */
export const getInitiativeSession = async (sessionId) => {
    try {
        const { data, error } = await supabase
            .from("initiative_sessions")
            .select("*")
            .eq("id", sessionId)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error("Error getting initiative session:", error)
        throw error
    }
}

/**
 * Subscribe to real-time updates for an initiative session
 * @param {string} sessionId - The session ID to subscribe to
 * @param {Function} callback - Function to call when updates occur
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToInitiativeSession = (sessionId, callback) => {
    return supabase
        .channel(`initiative_${sessionId}`)
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "initiative_sessions",
                filter: `id=eq.${sessionId}`,
            },
            (payload) => {
                callback(payload.new.combat_state)
            }
        )
        .subscribe()
}

/**
 * Deactivate and delete an initiative session
 * @param {string} sessionId - The session ID to delete
 * @returns {Promise<void>}
 */
export const deactivateInitiativeSession = async (sessionId) => {
    try {
        const { error } = await supabase
            .from("initiative_sessions")
            .delete()
            .eq("id", sessionId)

        if (error) throw error
    } catch (error) {
        console.error("Error deactivating initiative session:", error)
        throw error
    }
}
