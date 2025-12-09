-- Vendors
create table if not exists vendors (
  id bigint generated always as identity primary key,
  name text not null,
  gst text,
  payment_terms text,
  lead_time text,
  contact_name text,
  contact_email text,
  contact_phone text,
  created_at timestamp with time zone default now()
);

-- Rate Contracts
create table if not exists rate_contracts (
  id bigint generated always as identity primary key,
  vendor_id bigint references vendors(id) on delete cascade,
  product text not null,
  rate numeric not null,
  valid_from date,
  valid_to date,
  packaging text,
  created_at timestamp default now()
);

-- Purchase Orders
create table if not exists purchase_orders (
  id bigint generated always as identity primary key,
  vendor_id bigint references vendors(id) on delete cascade,
  product text,
  quantity numeric,
  rate numeric,
  delivery_date date,
  tax numeric,
  payment_terms text,
  notes text,
  created_at timestamp default now()
);

-- QC Entries
create table if not exists qc (
  id bigint generated always as identity primary key,
  po_id bigint references purchase_orders(id) on delete cascade,
  batch_no text,
  purity numeric,
  moisture numeric,
  appearance text,
  accepted boolean,
  coa_url text,
  created_at timestamp default now()
);

-- GRN
create table if not exists grn (
  id bigint generated always as identity primary key,
  grn_code text,
  po_id bigint references purchase_orders(id) on delete cascade,
  qc_id bigint references qc(id),
  accepted_qty numeric,
  rejected_qty numeric,
  remarks text,
  created_at timestamp default now()
);

-- Invoice
create table if not exists invoices (
  id bigint generated always as identity primary key,
  po_id bigint references purchase_orders(id) on delete cascade,
  invoice_no text,
  invoice_qty numeric,
  invoice_amount numeric,
  taxes numeric,
  file_url text,
  created_at timestamp default now()
);
