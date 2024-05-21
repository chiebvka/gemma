import { createClient } from "@/utils/supabase/server";
import Pricing from "./_components/Pricing";

export default async function PricingPage() {
    const supabase = createClient();

    const {
        data: { user }
      } = await supabase.auth.getUser();
    
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .maybeSingle();
    
      if (error) {
        console.log(error);
      }
    
      const { data: products } = await supabase
        .from('products')
        .select('*, prices(*)')
        .eq('active', true)
        .eq('prices.active', true)
        .order('metadata->index')
        .order('unit_amount', { referencedTable: 'prices' });

    return (
        <div className="w-full">
            <Pricing 
                user={user}
                products={products ?? []}
                subscription={subscription}
            />
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-12">
                <article>
                  <div className="space y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        {/* <time >{formatDate(date, siteMetadata.locale)}</time> */}
                        Why SMElancer?
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <span
                              // href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum porro ut nesciunt, nemo aliquid tenetur?
                            </span>
                          </h2>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, accusamus cum ratione quaerat eaque iure excepturi dolores, commodi vitae a nam incidunt laboriosam ab assumenda officia. Rerum eveniet accusamus vitae dolorum. Ipsam, unde dolorem debitis cupiditate, omnis reprehenderit autem dignissimos explicabo iure impedit possimus voluptatem quo labore. Suscipit corrupti in, dignissimos blanditiis amet omnis ipsam iste a aperiam minus similique?
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <span
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          Read more &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            </ul>
        </div>
    )
}