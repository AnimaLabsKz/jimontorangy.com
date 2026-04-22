export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      brands: {
        Row: {
          created_at: string
          description_en: string
          description_kg: string
          description_kz: string
          description_ru: string
          description_uz: string
          id: string
          logo_url: string | null
          name_en: string
          name_kg: string
          name_kz: string
          name_ru: string
          name_uz: string
          position: number
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string
          description_kg?: string
          description_kz?: string
          description_ru?: string
          description_uz?: string
          id?: string
          logo_url?: string | null
          name_en?: string
          name_kg?: string
          name_kz?: string
          name_ru?: string
          name_uz?: string
          position?: number
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_kg?: string
          description_kz?: string
          description_ru?: string
          description_uz?: string
          id?: string
          logo_url?: string | null
          name_en?: string
          name_kg?: string
          name_kz?: string
          name_ru?: string
          name_uz?: string
          position?: number
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_handled: boolean
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_handled?: boolean
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_handled?: boolean
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      habit_logs: {
        Row: {
          created_at: string
          date: string
          habit_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          habit_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          habit_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_logs_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          color: string
          created_at: string
          description: string
          frequency: Json
          id: string
          name: string
          position: number
          reminder_time: string | null
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string
          frequency?: Json
          id?: string
          name: string
          position?: number
          reminder_time?: string | null
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          frequency?: Json
          id?: string
          name?: string
          position?: number
          reminder_time?: string | null
          user_id?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          body_en: string
          body_kg: string
          body_kz: string
          body_ru: string
          body_uz: string
          cover_url: string | null
          created_at: string
          excerpt_ru: string
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          title_en: string
          title_kg: string
          title_kz: string
          title_ru: string
          title_uz: string
          updated_at: string
        }
        Insert: {
          body_en?: string
          body_kg?: string
          body_kz?: string
          body_ru?: string
          body_uz?: string
          cover_url?: string | null
          created_at?: string
          excerpt_ru?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          title_en?: string
          title_kg?: string
          title_kz?: string
          title_ru?: string
          title_uz?: string
          updated_at?: string
        }
        Update: {
          body_en?: string
          body_kg?: string
          body_kz?: string
          body_ru?: string
          body_uz?: string
          cover_url?: string | null
          created_at?: string
          excerpt_ru?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          title_en?: string
          title_kg?: string
          title_kz?: string
          title_ru?: string
          title_uz?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          description_en: string
          description_kg: string
          description_kz: string
          description_ru: string
          description_uz: string
          id: string
          image_url: string | null
          name_en: string
          name_kg: string
          name_kz: string
          name_ru: string
          name_uz: string
          position: number
          slug: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description_en?: string
          description_kg?: string
          description_kz?: string
          description_ru?: string
          description_uz?: string
          id?: string
          image_url?: string | null
          name_en?: string
          name_kg?: string
          name_kz?: string
          name_ru?: string
          name_uz?: string
          position?: number
          slug: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description_en?: string
          description_kg?: string
          description_kz?: string
          description_ru?: string
          description_uz?: string
          id?: string
          image_url?: string | null
          name_en?: string
          name_kg?: string
          name_kz?: string
          name_ru?: string
          name_uz?: string
          position?: number
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
        }
        Relationships: []
      }
      translations: {
        Row: {
          en: string
          id: string
          key: string
          kg: string
          kz: string
          ru: string
          updated_at: string
          uz: string
        }
        Insert: {
          en?: string
          id?: string
          key: string
          kg?: string
          kz?: string
          ru?: string
          updated_at?: string
          uz?: string
        }
        Update: {
          en?: string
          id?: string
          key?: string
          kg?: string
          kz?: string
          ru?: string
          updated_at?: string
          uz?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
