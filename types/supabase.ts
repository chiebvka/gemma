export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          mobile: string | null
          name: string | null
          profile_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          mobile?: string | null
          name?: string | null
          profile_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          mobile?: string | null
          name?: string | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      deliverables: {
        Row: {
          amount_due: number | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          isComplete: boolean | null
          position: number | null
          profile_id: string | null
          project_id: string | null
          start_date: string | null
          tasks: string | null
          title: string | null
        }
        Insert: {
          amount_due?: number | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          isComplete?: boolean | null
          position?: number | null
          profile_id?: string | null
          project_id?: string | null
          start_date?: string | null
          tasks?: string | null
          title?: string | null
        }
        Update: {
          amount_due?: number | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          isComplete?: boolean | null
          position?: number | null
          profile_id?: string | null
          project_id?: string | null
          start_date?: string | null
          tasks?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliverables_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverables_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      invoiceProduct: {
        Row: {
          created_at: string
          id: string
          name: string | null
          price: number | null
          productAmount: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          price?: number | null
          productAmount?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          price?: number | null
          productAmount?: number | null
          quantity?: number | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          created_at: string
          cuurency: string | null
          discount: number | null
          duedate: string | null
          id: string
          InvoiceNumber: string | null
          invoiceProducts: Json | null
          notes: string | null
          paymentLink: string | null
          profile_id: string | null
          project_id: string | null
          recepient: Json | null
          recepient_address: string | null
          recepient_email: string | null
          recepient_mobile: number | null
          recepient_name: string | null
          status: boolean | null
          subTotalAmount: number | null
          tax: number | null
          totalAmount: number | null
        }
        Insert: {
          created_at?: string
          cuurency?: string | null
          discount?: number | null
          duedate?: string | null
          id: string
          InvoiceNumber?: string | null
          invoiceProducts?: Json | null
          notes?: string | null
          paymentLink?: string | null
          profile_id?: string | null
          project_id?: string | null
          recepient?: Json | null
          recepient_address?: string | null
          recepient_email?: string | null
          recepient_mobile?: number | null
          recepient_name?: string | null
          status?: boolean | null
          subTotalAmount?: number | null
          tax?: number | null
          totalAmount?: number | null
        }
        Update: {
          created_at?: string
          cuurency?: string | null
          discount?: number | null
          duedate?: string | null
          id?: string
          InvoiceNumber?: string | null
          invoiceProducts?: Json | null
          notes?: string | null
          paymentLink?: string | null
          profile_id?: string | null
          project_id?: string | null
          recepient?: Json | null
          recepient_address?: string | null
          recepient_email?: string | null
          recepient_mobile?: number | null
          recepient_name?: string | null
          status?: boolean | null
          subTotalAmount?: number | null
          tax?: number | null
          totalAmount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pdfDesigns: {
        Row: {
          created_at: string
          id: number
          imageLink: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          imageLink?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          imageLink?: string | null
          name?: string | null
        }
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          companyAddress: string | null
          companyEmail: string | null
          companyMobile: string | null
          companyName: string | null
          connectedAccountId: string | null
          created_at: string
          email: string | null
          id: string
          lemonsqueezyId: string | null
          logoLink: string | null
          paymentLink: string | null
          paymentStatus: boolean | null
          paypalId: string | null
          paystackId: string | null
          processor: string | null
          stripe_customer_id: string | null
          stripeConnectLinked: boolean | null
        }
        Insert: {
          companyAddress?: string | null
          companyEmail?: string | null
          companyMobile?: string | null
          companyName?: string | null
          connectedAccountId?: string | null
          created_at?: string
          email?: string | null
          id: string
          lemonsqueezyId?: string | null
          logoLink?: string | null
          paymentLink?: string | null
          paymentStatus?: boolean | null
          paypalId?: string | null
          paystackId?: string | null
          processor?: string | null
          stripe_customer_id?: string | null
          stripeConnectLinked?: boolean | null
        }
        Update: {
          companyAddress?: string | null
          companyEmail?: string | null
          companyMobile?: string | null
          companyName?: string | null
          connectedAccountId?: string | null
          created_at?: string
          email?: string | null
          id?: string
          lemonsqueezyId?: string | null
          logoLink?: string | null
          paymentLink?: string | null
          paymentStatus?: boolean | null
          paypalId?: string | null
          paystackId?: string | null
          processor?: string | null
          stripe_customer_id?: string | null
          stripeConnectLinked?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          amount: number | null
          client_contract: string | null
          client_id: string | null
          created_at: string
          currency: string | null
          deliverable_id: string | null
          deliverables: Json[] | null
          deposit: number | null
          description: string | null
          due_date: string | null
          id: string
          invoice_id: string | null
          isDraft: boolean | null
          issueInvoice: boolean | null
          name: string | null
          profile_id: string | null
          receipt_id: string | null
          signature: boolean | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          client_contract?: string | null
          client_id?: string | null
          created_at?: string
          currency?: string | null
          deliverable_id?: string | null
          deliverables?: Json[] | null
          deposit?: number | null
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_id?: string | null
          isDraft?: boolean | null
          issueInvoice?: boolean | null
          name?: string | null
          profile_id?: string | null
          receipt_id?: string | null
          signature?: boolean | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          client_contract?: string | null
          client_id?: string | null
          created_at?: string
          currency?: string | null
          deliverable_id?: string | null
          deliverables?: Json[] | null
          deposit?: number | null
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_id?: string | null
          isDraft?: boolean | null
          issueInvoice?: boolean | null
          name?: string | null
          profile_id?: string | null
          receipt_id?: string | null
          signature?: boolean | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "deliverables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_receipt_id_fkey"
            columns: ["receipt_id"]
            isOneToOne: false
            referencedRelation: "receipt"
            referencedColumns: ["id"]
          },
        ]
      }
      receipt: {
        Row: {
          created_at: string
          cuurency: string | null
          discount: number | null
          duedate: string | null
          id: string
          InvoiceNumber: string | null
          paymentLink: string | null
          products: string | null
          recepient: Json | null
          status: boolean | null
          tax: number | null
        }
        Insert: {
          created_at?: string
          cuurency?: string | null
          discount?: number | null
          duedate?: string | null
          id?: string
          InvoiceNumber?: string | null
          paymentLink?: string | null
          products?: string | null
          recepient?: Json | null
          status?: boolean | null
          tax?: number | null
        }
        Update: {
          created_at?: string
          cuurency?: string | null
          discount?: number | null
          duedate?: string | null
          id?: string
          InvoiceNumber?: string | null
          paymentLink?: string | null
          products?: string | null
          recepient?: Json | null
          status?: boolean | null
          tax?: number | null
        }
        Relationships: []
      }
      recepients: {
        Row: {
          created_at: string
          email: string | null
          id: number
          mobileNumber: number | null
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          mobileNumber?: number | null
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          mobileNumber?: number | null
          name?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
