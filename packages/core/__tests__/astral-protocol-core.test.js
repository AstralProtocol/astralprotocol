import AstralClient from '../lib/astral-client';

describe('astral-client', () => {

    describe('creates documents', () => {

        beforeEach(() => {
            const astral = new AstralClient('0xa3e1c2602f628112E591A18004bbD59BDC3cb512');
        });

        describe('root', () => {
            it('creates collection', async() => {
                await expect(astral.createGenesisGeoDID('collection')).resolves.toHaveReturned();
            });

            it('creates item', async() => {
                await expect(astral.createGenesisGeoDID('item')).resolves.toHaveReturned();
            });

            it('fails to create document', async() => {
                expect.assertions(1);
                try {
                    await expect(astral.createGenesisGeoDID('document'));
                }catch(e) {
                    expect(e).toEqual({ error: 'Invalid Option, please select Item or Collection' });
                }
            });
        });

        describe('children', () => {
            beforeEach( async() => {
                const res = await astral.createGenesisGeoDID('collection');
                const results = await astral.pinDocument(res);
            });

            it('creates child collection w/ collection parent', async() => {
                await expect(astral.createChildGeoDID('collection', results.geodidid, 'collection')).resolves.toHaveReturned();
            });

            it('creates child item w/ collection parent', async() => {
                await expect(astral.createChildGeoDID('item', results.geodidid, 'item1')).resolves.toHaveReturned();
            });
        })
    })
});


