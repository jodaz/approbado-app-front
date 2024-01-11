import * as React from 'react'
import { BottomSheetProps, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { IComp } from '../types';
import BottomSheet from '@gorhom/bottom-sheet';

interface CustomBottomSheet extends BottomSheetProps {
    renderContent: () => void;
}

const DEFAULT_OPTIONS = {
    snapPoints: ['25%', '50%'],
    index: -1,
    renderContent: () => null,
};

export interface BottomSheetContextValue {
    expand: (options: CustomBottomSheet) => void;
    collapse: () => void;
}

export const BottomSheetContext = React.createContext<BottomSheetContextValue | undefined>(undefined);

export const useBottomSheet = () => {
    const context = React.useContext(BottomSheetContext);

    if (context === undefined) {
      throw new Error('useBottomSheet must be used within a BottomSheetContext');
    }

    return context;
};

export const BottomSheetProvider = ({ children }: IComp) => {
    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const [options, setOptions] = React.useState<CustomBottomSheet>({ ...DEFAULT_OPTIONS });

    const collapseBottomSheet = React.useCallback(() => {
        bottomSheetRef.current?.close();
        setOptions({ ...DEFAULT_OPTIONS });
    }, []);

    const bottomSheetContext: BottomSheetContextValue = React.useMemo(
        () => ({
            expand: (opts: CustomBottomSheet) => {
                bottomSheetRef.current?.expand();
                setOptions({ ...DEFAULT_OPTIONS, ...opts });
            },
            collapse: collapseBottomSheet,
        }),
        [collapseBottomSheet],
    );
        console.log(options)
    return (
      <BottomSheetContext.Provider value={bottomSheetContext}>
          {children}
            <BottomSheet
                index={-1}
                snapPoints={options.snapPoints}
                ref={bottomSheetRef}
                backdropComponent={BottomSheetBackdrop}
            >
                {options.renderContent()}
            </BottomSheet>
      </BottomSheetContext.Provider>
    );
};
