import {newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';

describe('user-card e2e', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-user-card></joy-user-card>');
        const element: E2EElement = await page.find('joy-user-card');
        expect(element).toHaveClass('hydrated');
    });

    it('renders a basic user card with fullname, subtitle and avatar, given props only', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent(`
            <joy-user-card 
                full-name="Tom Hanks"
                sub-title="This is a description"
                rating-value="4"
                photo-url="https://globalnews.ca/wp-content/uploads/2018/08/gettyimages-903462776.jpg?w=100">    
            </joy-user-card>
        `);
        const avatar: E2EElement = await page.find('joy-user-card >>> joy-avatar');
        const title: E2EElement = await page.find('joy-user-card >>> .joy-user-card__title');
        const subtitle: E2EElement = await page.find('joy-user-card >>> .joy-user-card__subtitle');
        const rating: E2EElement = await page.find('joy-user-card >>> joy-rating-stars');

        expect(avatar).not.toBe(null);
        expect(rating).not.toBe(null);
        expect(title.textContent).toBe('Tom Hanks');
        expect(subtitle.textContent).toBe('This is a description');
    });

    it('renders a user card with avatar via its slot', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent(`
            <joy-user-card 
                full-name="Tom Hanks"
                sub-title="This is a description">   
                <joy-avatar slot="user-card-avatar" photo-url="https://globalnews.ca/wp-content/uploads/2018/08/gettyimages-903462776.jpg?w=100"></joy-avatar> 
            </joy-user-card>
        `);
        const avatar: E2EElement = await page.find('joy-user-card >>> joy-avatar');

        expect(avatar).not.toBe(null);
    });

    it('renders a user card with given slots only', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent(`
            <joy-user-card>   
                <joy-avatar slot="user-card-avatar" photo-url="https://globalnews.ca/wp-content/uploads/2018/08/gettyimages-903462776.jpg?w=100"></joy-avatar> 
                <span class="custom-title" slot="user-card-title">I am Tom Hanks</span>
                <span class="custom-subtitle" slot="user-card-subtitle">And I don't work for FedEx</span>
                <joy-rating-stars slot="user-card-rating-stars" ratin-value="5"></joy-rating-stars>
                <p class="free-content" slot="user-card-free-slot">Here I can inject any HTML I want</p>
            </joy-user-card>
        `);

        const avatar: E2EElement = await page.find('joy-user-card >>> joy-avatar');
        const title: E2EElement = await page.find('joy-user-card .custom-title');
        const subtitle: E2EElement = await page.find('joy-user-card .custom-subtitle');
        const stars: E2EElement = await page.find('joy-user-card joy-rating-stars');
        const freeSlot: E2EElement = await page.find('joy-user-card .free-content');

        expect(avatar).not.toBe(null);
        expect(stars).not.toBe(null);
        expect(title.textContent).toBe('I am Tom Hanks');
        expect(subtitle.textContent).toBe("And I don't work for FedEx");
        expect(freeSlot.textContent).toBe('Here I can inject any HTML I want');
    });
});
