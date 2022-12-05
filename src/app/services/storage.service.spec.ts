import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
    let service: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('setting and retrieving items', () => {
        const item = { key: "foo", value: "bar" }
        
        it('should set an item', () => {
            const setFunction = spyOn(service, 'setItem')
            service.setItem(item.key, item.value)
            expect(setFunction).toHaveBeenCalledTimes(1)
        })

        it('should retrieve an item', () => {
            const retrieveFunction = spyOn(service, 'getItem')
            service.setItem(item.key, item.value)
            service.getItem(item.key)
            expect(retrieveFunction).toHaveBeenCalledTimes(1)            
        })

        it('should retrieve the item correctly', () => {
            service.setItem(item.key, item.value)
            const value = service.getItem(item.key)
            expect(value).toBe("bar")
        })
    })
});
