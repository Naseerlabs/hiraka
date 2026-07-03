-- Function to fetch random words of a given script type
create or replace function public.get_random_words(
  p_script_type text,
  p_count int default 20
)
returns setof public.words
language sql
stable
as $$
  select *
  from public.words
  where script_type = p_script_type
  order by random()
  limit p_count;
$$;
